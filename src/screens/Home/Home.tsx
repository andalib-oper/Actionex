import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { fontFamilyBlack, fontFamilyBold } from '../../styles/globalStyles'
import CustomHeader from '../../components/CustomHeader/CustomHeader'
import { client } from '../../utils/helpers'
import { getUserDetails } from '../../redux/auth/action'
import { useSelector } from 'react-redux'

const Home = () => {
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);
  const authState = useSelector((state:any)=>state.authState)
  useEffect(()=>{
    getUserDetails()
  },[])
  console.log("auth", authState?.userDetails)
  return (
    <View style={styles.container}>
      <CustomHeader title='Actionex' />
      <View style={styles.mainContainer}>
        <Text style={styles.lists}>All Lists:</Text>
      </View>
    </View>
  );
};

export default Home

const makeStyles = (fontScale:number) => StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f4f4f4',
  },
  mainContainer:{
    padding:20
  },
  lists:{
    fontSize: 20/fontScale,
    fontFamily: fontFamilyBold,
    color:'#000'
  }

})