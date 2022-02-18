# 타입스크립트로 react-navigations 사용하기

#### 네이티브 스택 네비게이션에서 사용할 화면 타입 선언하기 
스택 네비비게이터를 사용할때는 스크린에 대한 Params 타입을 지정한 후 `createNativeStackNavigator`에 제너릭으로 지정해주어야 한다

```tsx
type RootStackParamList = {
  Home: undefined;
  Detail: {
    id: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
```

#### useNavigation 사용하기
useNavigation 을 사용할때 파라미터타입 검증을 위해 `NativeStackNavigationProp` 받아와 생성한 타입을 useNavigation에 제너릭으로 넣어준다

```tsx
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
...
const navigation = useNavigation<RootStackNavigationProp>();
```

#### useRoute 사용하기

```tsx
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
const DetailScreen = () => {
  const {params} = useRoute<DetailScreenRouteProp>();
  return (
    <View>
      <Text>Detail {params.id}</Text>
    </View>
  );
};
```

RouteProp의 첫번째 제너릭은 RootStackParamList을 넣고 두번째는 화면 이름을 넣는다

### 내비게이션 감싸기
bottomTab 네비게이션도 마찬가지로 스크린에 파라미터에 대한 타입을 추가한다
```tsx
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, NavigatorScreenParams } from "@react-navigation/native";
import {RootStackNavigationProp} from './RootStack';

type MainTabParamList = {
  Home: undefined;
  Account: undefined;
};

// type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;
export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
  >;

// 추후 RootStack 내부 화면에서
// navigation.navigate('MainTab', {screen: 'Account'})를 가능하게 해줌
export type MainTabNavigationScreenParams = NavigatorScreenParams<MainTabParamList>

const Tab = createBottomTabNavigator<MainTabParamList>();
```
bottom-tabs 네비게이션만 쓸경우에는 
`type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;` 이것으로 충분하지만

rootStack 네비게이션과 같이 사용할 경우 `CompositeNavigationProp`로 타입을 합쳐주어야 한다

`screens/MainTab.tsx`
```tsx
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
```

## 서드파티 라이브러리 타입
공식 미지원 서드파티 라이브러리는 @types/[라이브러리] 를 설치하여 해결할 수 있다
`@foo/bar` 처럼 scope이 있는 라이브러리는 `@types/foo__bar` 로 설치할수 있다

직접 사용하는 것에 대한 타입을 지정하는 방법도 있다

`types.d.ts`
```tsx
declare module 'qs' {
  interface StringifyOptions {
    addQueryPrefix?: boolean;
  }
  interface ParseOptions {
    ignoreQueryPrefix?: boolean;
  }

  function stringify(object: any, options?: StringifyOptions): string;
  function parse<T = any>(str: string, options?: ParseOptions): T;
}
```
