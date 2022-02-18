import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import MainTab, {MainTabNavigationScreenParams} from './MainTab';

type RootStackParamList = {
  MainTab: MainTabNavigationScreenParams;
  Detail: {
    id: number;
  };
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
const DetailScreen = () => {
  const {params} = useRoute<DetailScreenRouteProp>();
  return (
    <View>
      <Text>Detail {params.id}</Text>
    </View>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={MainTab} name="MainTab" options={{headerShown: false}} />
      <Stack.Screen component={DetailScreen} name="Detail" />
    </Stack.Navigator>
  );
};

export default RootStack;
