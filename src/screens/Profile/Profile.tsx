import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { client } from '../../utils/helpers'
import { useDispatch } from 'react-redux'
import {userLogout } from '../../redux/auth/action'

const Profile = () => {
  const dispatch = useDispatch()
  return (
    <View>
      <Text>Profile</Text>
      <Button
      title='Logout'
      onPress={() => {dispatch(userLogout()as any)}}
      />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})