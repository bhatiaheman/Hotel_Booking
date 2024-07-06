import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { Link } from 'expo-router';

const Page = () => {

  const { signOut, isSignedIn}  = useAuth();
  return (
    <View>
      <Button title='Log out' onPress={() => signOut()} />
        {
           !isSignedIn &&
           <Link href={'/(models)/login'}>
              <Text>Log in</Text>
           </Link>
        }
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})