import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigation } from './navigations/RootStackNavigation.tsx';
import { WithSplashScreen } from './screens/Root/Splash.tsx';
import { client } from './utils/helpers.tsx';
import { MainStackNavigation } from './navigations/MainStackNavigation.tsx';


const Config = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  useEffect(()=>{
    setIsAppReady(true)
    const checkAuthentication = async () => {
      if (await client.isAuthenticated) {
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
      }
    };
     checkAuthentication();
  },[client])
  return (
    <WithSplashScreen isAppReady={isAppReady}>
    <NavigationContainer>
     {isLoggedIn?<MainStackNavigation/>:<RootStackNavigation/>}
    </NavigationContainer>
    </WithSplashScreen>
  )
}

export default Config

const styles = StyleSheet.create({})