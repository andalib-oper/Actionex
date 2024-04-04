import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import codePush from 'react-native-code-push';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Config from './src/Config';
import { Provider } from 'react-redux';
import store from './src/redux/store';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Provider store={store}>
      <Config/>
      </Provider>
    </SafeAreaView>
  );
}

export default codePush(App);
