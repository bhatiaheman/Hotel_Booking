import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';




const clerk_publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },

  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  }
}



SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    mon: require('../assets/fonts/Montserrat-Regular.ttf'),
    mon_sb: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    mon_b: require('../assets/fonts/Montserrat-Bold.ttf'),
    ...FontAwesome.font,
  });

 
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={clerk_publishableKey!} tokenCache={tokenCache} >
      <ClerkLoaded>
      <RootLayoutNav />
      </ClerkLoaded>
    </ClerkProvider>
  );
    
  
  
}




function RootLayoutNav() {

  const router = useRouter();

  const {isLoaded, isSignedIn} = useAuth();

  useEffect(() => {
    if(isLoaded && !isSignedIn) {
      router.push('/(models)/login')
    }
  }, [isLoaded])

  return (

      <Stack>
        
        <Stack.Screen 
          name="(models)/login" 
          options={{
            title: 'Log in or Sign up',
            presentation: 'modal',
            animation: 'slide_from_bottom',
            headerTitleStyle: {
              fontFamily: 'mon_sb'
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name='close-outline' size={28} />
              </TouchableOpacity>
            )
          }} 
        />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen 
          name='listing/[id]'
          options={{
            headerTitle: ''
          }}
        />

        <Stack.Screen 
          name='(models)/booking'
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name='close-outline' size={28} />
              </TouchableOpacity>
            )
          }}
          
        />
      </Stack>
    
  );
}
