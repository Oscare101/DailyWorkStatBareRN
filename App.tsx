import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import MainNavigation from './navigation/MainNavigation';
import {StatusBar} from 'react-native';
import colors from './constants/colors';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.bg} />
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
}
