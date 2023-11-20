import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Provider } from 'react-redux';
import Screen from "./View/Screen";
import store from './View/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Trang Chủ" component={Screen} />
          {/* Định nghĩa các màn hình khác ở đây */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
