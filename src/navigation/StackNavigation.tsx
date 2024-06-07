import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AppStackParamList} from './Types';
import RouteKey from './RouteKey';
import MainScreen from '@screens/MainScreen';
import TaskOne from '@screens/task-1';
import TaskTwo from '@screens/task-2';
import CreateNote from '@screens/task-2/sub-screen/CreateNote';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const MainNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      animation: 'slide_from_right',
      headerShown: false,
      orientation: 'portrait',
    }}
    initialRouteName={RouteKey.Login}>
    <Stack.Screen name={RouteKey.MainScreen} component={MainScreen} />
    <Stack.Screen name={RouteKey.TaskOneScreen} component={TaskOne} />
    <Stack.Screen name={RouteKey.TaskTwoScreen} component={TaskTwo} />
    <Stack.Screen name={RouteKey.CreateNoteScreen} component={CreateNote} />
  </Stack.Navigator>
);
