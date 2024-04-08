import { Button, Dimensions, Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { client } from '../../utils/helpers'
import { useDispatch, useSelector } from 'react-redux'
import {logout, userLogout } from '../../redux/auth/action'
import CustomHeader from '../../components/CustomHeader/CustomHeader'
import { fontFamilyBold } from '../../styles/globalStyles'
import CustomButton from '../../components/CustomButton/CustomButton'

const Profile = () => {
  const authState = useSelector((state)=>state.authState)
  const dispatch = useDispatch()
  const {fontScale} = useWindowDimensions()
  const styles = makestyles(fontScale)
  const [email,setEmail] = useState('')
  const emailDetails = async() =>{
    const {email} = await client.getUserDetails()
    console.log("email", email)
    setEmail(email)
  }
  useEffect(()=>{
    emailDetails()
  },[])
  return (
    <View style={{flex:1}}>
      <CustomHeader title="Actionex" />
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/profile.png')}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'contain',
            borderRadius: 100 / 2,
            alignSelf: 'center',
            marginTop: '20%',
          }}
        />
        <View style={{marginTop:'15%',}}>
        <Text style={styles.headerText}>Email Address</Text>
        <Text style={styles.mainText}>{email}</Text>
        </View>
      </View>
      <CustomButton
      title='Logout'
      onPress={()=>{
        dispatch(userLogout())
      }}
      style={{width: width/1.2, alignSelf:'center', marginBottom:10}}
      />
    </View>
  );
}
const {width} = Dimensions.get('window')
export default Profile

const makestyles = (fontScale: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
    headerText: {
      fontFamily: fontFamilyBold,
      fontSize: 16 / fontScale,
      color: 'grey',
      alignSelf:'flex-start',
      paddingVertical:10
    },
    mainText: {
      padding: 20, 
      borderWidth:1,
      borderColor:'#000',
      borderRadius:10,
      fontFamily: fontFamilyBold,
      fontSize: 14 / fontScale,
      color: '#c6c6c6',
    },
  });