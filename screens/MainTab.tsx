import {BottomTabNavigationProp, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, NavigatorScreenParams, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackNavigationProp} from './RootStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Text, View} from 'react-native';
import React from 'react';

type MainTabParamList = {
  Home: undefined;
  Account: undefined;
};

// type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;
export type MainTabNavigationProp = CompositeNavigationProp<RootStackNavigationProp, BottomTabNavigationProp<MainTabParamList>>;

// 추후 RootStack 내부 화면에서
// navigation.navigate('MainTab', {screen: 'Account'})를 가능하게 해줌
export type MainTabNavigationScreenParams = NavigatorScreenParams<MainTabParamList>;

const Tab = createBottomTabNavigator<MainTabParamList>();

const HomeScreen = () => {
  const navigation = useNavigation<MainTabNavigationProp>();
  const onPress = () => {
    navigation.navigate('Detail', {id: 1});
  };
  return (
    <View>
      <Text>Home</Text>
      <Button title="Open Detail" onPress={onPress} />
    </View>
  );
};

const AccountScreen = () => {
  return (
    <View>
      <Text>Account</Text>
    </View>
  );
};

const MainTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default MainTab;
