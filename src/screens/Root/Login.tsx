import { Button, Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, } from 'react-native'
import React, { useEffect } from 'react'
import {KindeSDK, TokenResponse} from '@kinde-oss/react-native-sdk-0-7x';
import { fontFamilyBold, fontFamilyRegular } from '../../styles/globalStyles';
import { primaryColor } from '../../styles/colors';
import CustomButton from '../../components/CustomButton/CustomButton';
import { client } from '../../utils/helpers';

const Login = () => {
  const {fontScale} = useWindowDimensions()
  const styles = makeStyles(fontScale)
  const handleSignIn = async () => {
    const token: TokenResponse | null = await client.login();
    if (token) {
      console.log('token signin', token);
      // User was authenticated
    }
  };
    const handleSignUp = async () => {
      const token: TokenResponse | null = await client.register();
      if (token) {
        console.log('token signup', token);
        // User was authenticated
      }
    };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Actionex</Text>
      <Image
        source={require('../../assets/images/login.png')}
        style={styles.loginImage}
      />
      <CustomButton
        title="Sign In"
        onPress={handleSignIn}
        variant="primary"
        style={styles.btn}
      />
      <CustomButton
        title="Sign Up"
        onPress={handleSignUp}
        variant="primary"
        style={styles.btn}
      />
    </View>
  );
}

export default Login
const {width,height} = Dimensions.get('window')
const makeStyles = (fontScale: number) => StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    padding:20,
  },
  text:{
    fontSize:36/fontScale,
    fontFamily: fontFamilyBold,
    color:primaryColor,
    alignSelf:'center',
    paddingTop:20
  },
  loginImage:{
    resizeMode:'cover',
width: width/1.02,
height: height/1.3,
alignSelf:'center',
backgroundColor:'red'
  },
  btn:{
    marginBottom:10
  }
})