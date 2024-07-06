import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';

const categories = [
    {
      name: 'Tiny homes',
      icon: 'home',
    },
    {
      name: 'Cabins',
      icon: 'house-siding',
    },
    {
      name: 'Trending',
      icon: 'local-fire-department',
    },
    {
      name: 'Play',
      icon: 'videogame-asset',
    },
    {
      name: 'City',
      icon: 'apartment',
    },
    {
      name: 'Beachfront',
      icon: 'beach-access',
    },
    {
      name: 'Countryside',
      icon: 'nature-people',
    },
  ];
  
  interface Props {
    onCategoryChanged: (category: string) => void;
  }

const ExploreHeader = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        
        <View style={styles.container}>
            <View style={styles.actionRow}>
                <Link href={'/(models)/booking'} asChild>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Ionicons name='search' size={24} />
                        
                        <View>
                            <Text style={{fontFamily: 'mon_sb'}}>Where to?</Text>
                            <Text style={{fontFamily: 'mon', color: Colors.grey}}>Anywhere ~ Any week</Text>
                        </View>
                    </TouchableOpacity>
                </Link>

                <TouchableOpacity style={styles.filterBtn}>
                    <Ionicons name='options-outline' size={24} />
                </TouchableOpacity>
            </View>
        </View>
        
    </SafeAreaView>
  )
}

export default ExploreHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 130
    },

    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 16
    },

    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 24,
    },

    searchBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderColor: "#c2c2c2",
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 30,
        padding: 10
    }
})