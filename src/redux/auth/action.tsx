import EncryptedStorage from "react-native-encrypted-storage";
import {Storage} from '@kinde-oss/react-native-sdk-0-7x';
import { client } from "../../utils/helpers";
import { GET_USERDETAILS, IS_LOGGED_IN, LOGOUT } from "./actionTypes";


interface IsLoggedInAction {
  type: typeof IS_LOGGED_IN;
  access_token: string; 
}

export const isLoggedIn = (data: any): IsLoggedInAction => ({
    type: IS_LOGGED_IN,
    access_token: data,
});
interface UseDetailsAction {
  type: typeof GET_USERDETAILS;
  data: object;
}
export const userDetails = (data: any): UseDetailsAction => ({
  type: GET_USERDETAILS,
  data: data,
});

interface Logout {
  type: typeof LOGOUT;
  data: object;
}
export const logout = (data: any): Logout => ({
  type: LOGOUT,
  data: data,
});

export const getUserDetails = () =>{
  return async (dispatch: any) =>{
    const {email} = await client.getUserDetails()
    console.log("userDETAILS", email)
    if(email){
      dispatch(userDetails({email: email}))
    }else{
      console.log("details not found")
    }
  }
}

export const tokenRetriver = () => {
  return async (dispatch: any) => {
    const {access_token} = await client.getToken();
    if (access_token) {
      dispatch(isLoggedIn(access_token));
      dispatch(getUserDetails())
    } else {
      console.log('token not found');
    }
  };
};


export const userLogout = () => {
  return async (dispatch: any) => {
    const loggedOut = await client.logout(true);
    if (loggedOut) {
      dispatch(logout(loggedOut));
      EncryptedStorage.removeItem('token');
    } else {
      console.log('token not found');
    }
  };
}