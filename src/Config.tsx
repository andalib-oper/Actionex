import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigation } from './navigations/RootStackNavigation.tsx';
import { WithSplashScreen } from './screens/Root/Splash.tsx';
import { MainStackNavigation } from './navigations/MainStackNavigation.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { client } from './utils/helpers.tsx';
import { isLoggedIn, tokenRetriver } from './redux/auth/action.tsx';

const Config = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  const dispatch = useDispatch()
  const authState = useSelector((state: any)=>state.authState) // Add type annotation for 'state'
  useEffect(()=>{
    setIsAppReady(true)
  },[client])
  return (
    <WithSplashScreen isAppReady={isAppReady}>
    <NavigationContainer>
     {authState?.isLoggedIn?<MainStackNavigation/>:<RootStackNavigation/>}
    </NavigationContainer>
    </WithSplashScreen>
  )
}

export default Config

const styles = StyleSheet.create({})