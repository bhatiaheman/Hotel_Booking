import { PermissionsAndroid, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultStyles } from '@/constants/Styles'
import * as Permission from 'expo-permissions';
interface Props {
    listings:any
}

const ListingsMap = ({listings}: Props) => {

    const mapReady = () => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ).then(granted => {
            alert(granted)
        })
    }

    
  return (
    <View style={defaultStyles.container}>
      <MapView 
      style={styles.map} 
      showsUserLocation={true}
      showsMyLocationButton={true}
      provider={PROVIDER_GOOGLE}
       
        
      />
    </View>
  )
}

export default ListingsMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        height: '100%',
        width: '100%'
    }
})