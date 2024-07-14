import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import listingData from '@/assets/data/airbnb-listings.json';


const Page = () => {

  

  const [category, setCategory] = useState('Tiny homes');

  const items = useMemo(() => listingData as any, [])
  const onDataChanged = (category: string) => {
    setCategory(category);
  }

  return (
    <View style={{flex: 1}}>
      <Stack.Screen options={{
        header: () =>  <ExploreHeader onCategoryChanged={onDataChanged} />
      }} />

      <Listings listings={items} category={category}/>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})