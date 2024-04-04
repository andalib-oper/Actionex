import { KindeSDK } from "@kinde-oss/react-native-sdk-0-7x";
import {
  KINDE_ISSUER_URL,
  KINDE_POST_CALLBACK_URL,
  KINDE_POST_LOGOUT_REDIRECT_URL,
  KINDE_CLIENT_ID,
} from '@env';

export const client = new KindeSDK(KINDE_ISSUER_URL, KINDE_POST_CALLBACK_URL, KINDE_CLIENT_ID, KINDE_POST_LOGOUT_REDIRECT_URL);