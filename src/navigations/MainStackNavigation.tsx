import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { fontFamilyBold, fontFamilyRegular } from '../styles/globalStyles';
import { primaryColor, secondaryColor } from '../styles/colors';
import { useWindowDimensions } from 'react-native';

const Tab = createBottomTabNavigator();

export const MainStackNavigation = () =>{
    const {fontScale} = useWindowDimensions()
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: primaryColor,
          tabBarInactiveTintColor: '#A0A3B1',
          tabBarStyle: {
            height: 80,
            elevation: 0,
            borderColor: '#fff',
          },
          headerShown: false,
          tabBarLabelStyle: {
            height: 30,
            fontSize: 14,
            marginTop: -10,
            fontFamily: fontFamilyRegular,
          },
          tabBarHideOnKeyboard: true,
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return <AntDesign name="home" color={color} size={size} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return <AntDesign name="user" color={color} size={size} />;
            },
          }}
        />
      </Tab.Navigator>
    );
}
