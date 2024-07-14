import { FlatList, Image, ListRenderItem, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({listings: items, category}: Props) => {

  const  [loading, setLoading] = useState(false);

  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    setLoading(true);
    console.log('Reload Listings', items.length);

    setTimeout(() => {
      setLoading(false);
    }, 200)

  }, [category]);

  const renderRow: ListRenderItem<any> = ({item}) => (
    <Link href={`/listing/${item.id}`} >
      <TouchableOpacity>
        <View style={styles.listing}>
          <Image source={{uri: item.medium_url}} />
        </View>
      </TouchableOpacity>
    </Link>
  )

  return (
    <View style={defaultStyles.container}>
      <FlatList 
        ref={listRef}
        data={loading ? [] :items }
        renderItem={renderRow}
      
      /> 
    </View>
  )
}

export default Listings

const styles = StyleSheet.create({
  listing: {
    padding: 16
  }
})