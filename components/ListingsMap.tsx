import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultStyles } from '@/constants/Styles'
import * as Location from 'expo-location';
import { Listing } from '@/interfaces/listing';


interface Props {
    listings:any
}

interface Coordinates {
  latitude: number, 
  longitude: number, 
  latitudeDelta: number, 
  longitudeDelta: number
}


const ListingsMap = ({listings}: Props) => {

    const [currentlocation, setCurrentLocation] = useState<Location.LocationObjectCoords | null>(null);
    const [initialRegion, setInitialRegion] = useState<Coordinates | null>(null);


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

  return (
    <View style={defaultStyles.container}>
      { initialRegion &&

        <MapView style={StyleSheet.absoluteFill} 
        initialRegion={initialRegion} 
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        >

          {listings.features.map((item:Listing ) => (
            <Marker coordinate={{
              latitude: item.
            }}
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

    
})