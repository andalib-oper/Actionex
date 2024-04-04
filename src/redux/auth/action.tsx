import EncryptedStorage from "react-native-encrypted-storage";
import { client } from "../../utils/helpers";
import { GET_USERDETAILS, IS_LOGGED_IN } from "./actionTypes";


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

export const getUserDetails = () =>{
  return async (dispatch: any) =>{
    const {email} = await client.getUserDetails()
    console.log("detailsssssss", email)
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
    const getToken = EncryptedStorage.getItem('token')
    console.log('accesstoken', getToken, access_token);
    if (getToken) {
      dispatch(isLoggedIn(getToken));
    } else {
      console.log('details not found');
    }
  };
};