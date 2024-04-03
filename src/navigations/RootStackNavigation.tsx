import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Root/Login';
import Signup from '../screens/Root/Signup';

const Stack = createNativeStackNavigator();

export const RootStackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}