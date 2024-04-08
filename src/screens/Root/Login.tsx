import {
  Button,
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {KindeSDK, TokenResponse} from '@kinde-oss/react-native-sdk-0-7x';
import {fontFamilyBold, fontFamilyRegular} from '../../styles/globalStyles';
import {primaryColor} from '../../styles/colors';
import CustomButton from '../../components/CustomButton/CustomButton';
import {client} from '../../utils/helpers';
import {useDispatch} from 'react-redux';
import {getUserDetails, isLoggedIn} from '../../redux/auth/action';
import EncryptedStorage from 'react-native-encrypted-storage'
import { LoginIllustration } from '../../assets/svgImages';
import { addUserDetails } from '../../firebaseApis';

const Login = () => {
  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale);
  const dispatch = useDispatch();
  const handleSignIn = async () => {
    const token: TokenResponse | null = await client.login();
    if (token) {
      EncryptedStorage.setItem('token', token.access_token);
      dispatch(isLoggedIn(token.access_token) as any);
      // User was authenticated
    }
  };
  const handleSignUp = async () => {
    const token: TokenResponse | null = await client.register();
    if (token) {
      const details = await client.getUserDetails();
      EncryptedStorage.setItem('token', token.access_token);
      dispatch(isLoggedIn(token.access_token) as any);
      addUserDetails({email: details.email, id: details.id});
      // User was authenticated
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Actionex</Text>
      <LoginIllustration height={height/1.3}/>
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
};

export default Login;
const {width, height} = Dimensions.get('window');
const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    text: {
      fontSize: 36 / fontScale,
      fontFamily: fontFamilyBold,
      color: primaryColor,
      alignSelf: 'center',
      paddingTop: 20,
    },
    loginImage: {
      resizeMode: 'cover',
      width: width / 1.02,
      height: height / 1.3,
      alignSelf: 'center',
      backgroundColor: 'red',
    },
    btn: {
      marginBottom: 10,
    },
  });
