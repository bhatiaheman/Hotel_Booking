import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';

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

const ExploreHeader = ({onCategoryChanged} : Props) => {

  const scrollRef = useRef<ScrollView>(null);

  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {

    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
        scrollRef.current?.scrollTo({x: x, y:0, animated: true})
    })

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onCategoryChanged(categories[index].name);
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#fff'}}>
        
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

           
            <ScrollView 
              horizontal ={true}  
              ref={scrollRef}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                
                alignItems: 'center',
                gap: 30,
                paddingHorizontal: 16,
                
              }}
            >
             
              {
                categories.map((item,idx) => (
                  <TouchableOpacity key={idx}
                    onPress={() => selectCategory(idx)}
                    ref={(el) => itemsRef.current[idx] = el}
                    style={activeIndex == idx ? styles.categoriesBtnActive : styles.categoriesBtn}
                  >

                    <MaterialIcons 
                      size={24} 
                      name={item.icon as any} 
                      color={activeIndex == idx ? '#000': Colors.grey}
                    />
                    <Text style={activeIndex == idx ? styles.categoryTextActive : styles.categoryText}>
                      {item.name}
                    </Text>

                  </TouchableOpacity>
                ))
              }
                 
            </ScrollView>
            
        </View>
        
    </SafeAreaView>
  )
}

export default ExploreHeader

const styles = StyleSheet.create({
    container: {
        
        backgroundColor: '#fff',
        height: 145
    },

    actionRow: {
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 16,
        gap: 10,
        paddingTop: 10
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
        padding: 14,
        backgroundColor: '#fff',
        flex: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        
    },

    categoryText: {
      fontSize: 14,
      fontFamily: 'mon_sb',
      color: Colors.grey
    },

    categoryTextActive: {
      fontSize: 14,
      fontFamily: 'mon_sb',
      color: '#000'
    },

    categoriesBtn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 8,
    },
    categoriesBtnActive: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: '#000',
      borderBottomWidth: 2,
      paddingBottom: 8,
    },
})