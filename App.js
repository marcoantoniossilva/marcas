import React from 'react';

import { StatusBar } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Feeds from './src/screens/Feeds';
import Details from './src/screens/Details';

const Navigator = createStackNavigator(
  {
    Feeds: { screen: Feeds },
    Detalhes: { screen: Details }
  }
);

const Container = createAppContainer(Navigator);

export default function App() {
  return (
    <MenuProvider>
      <StatusBar></StatusBar>
      <Container></Container>
    </MenuProvider>
  )
}