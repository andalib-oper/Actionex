import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigation } from './navigations/RootStackNavigation.tsx';
import { WithSplashScreen } from './screens/Root/Splash.tsx';


const Config = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  useEffect(()=>{
    setIsAppReady(true)
  },[])
  return (
    <WithSplashScreen isAppReady={isAppReady}>
    <NavigationContainer>
     <RootStackNavigation/>
    </NavigationContainer>
    </WithSplashScreen>
  )
}

export default Config

const styles = StyleSheet.create({})