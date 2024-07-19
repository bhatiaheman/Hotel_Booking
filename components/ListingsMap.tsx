import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultStyles } from '@/constants/Styles'
import * as Location from 'expo-location';
import { Listing } from '@/interfaces/listing';
import { ListingGeo } from '@/interfaces/geoListing';
import { useRouter } from 'expo-router';
import MapView from 'react-native-map-clustering';
import Colors from '@/constants/Colors';


interface Props {
    listings:any
}




const ListingsMap = ({listings}: Props) => {

    const router  = useRouter();

    const [currentlocation, setCurrentLocation] = useState<Location.LocationObjectCoords | null>(null);
    const [initialRegion, setInitialRegion] = useState<{ latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number } | null>(null);


    useEffect(() => {
      
      const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
  
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }

      getLocation();
      
      
    },[]);


    const onMarkerSelected = (item:ListingGeo) => {
      router.push(`/listing/${item.properties.id}`)
    }

    const renderCluster = (cluster:any) => {
      const {id, geometry, onPress, properties} = cluster;

      const points = properties.point_count;

      return (
        <Marker key={`cluster-${id}`} 
          onPress={onPress}
          coordinate={{
            latitude: geometry.coordinates[1],
            longitude: geometry.coordinates[0]
          }}
        >
          <View style={styles.marker}>
            <Text style={{
              color: '#000',
              textAlign: 'center',
              fontFamily: 'mon_sb'
            }}>
              {points}
            </Text>
          </View>
        </Marker>
      )
    }

  return (
    <View style={defaultStyles.container}>
      { initialRegion &&

        <MapView style={StyleSheet.absoluteFill} 
        animationEnabled={false}
        initialRegion={initialRegion} 
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        clusterColor="#fff"
        clusterTextColor='#000'
        clusterFontFamily='mon_sb'
        renderCluster={renderCluster}
        >

          {listings.features.map((item:ListingGeo ) => (
            <Marker 
            key={item.properties.id}
            onPress={() =>onMarkerSelected(item)}
            tracksViewChanges={false}
            coordinate={{
              latitude: Number(item.properties.latitude),
              longitude: Number(item.properties.longitude)
            }} >

              <View style={styles.marker}>
                <Text style={styles.markerText}>€ {item.properties.price}</Text>
              </View>

            </Marker>
             
          ))}

        </MapView>

      }

    </View>
  )
}

export default ListingsMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    marker: {
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      elevation: 5,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },

    markerText: {
      fontSize: 14,
      fontFamily: 'mon_sb',

    },

    locateBtn: {
      position: 'absolute',
      top: 70,
      right: 20,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },

    
})