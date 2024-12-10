import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import React from "react";
import Home from "../Screens/Home";
import Map from "../Screens/Map";
import Profile from "../Screens/Profile";
import Qr from "../Screens/Qr";
import {Ionicons} from '@expo/vector-icons'

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: `Home`,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Map" component={Map} options={{
          tabBarLabel: `Map`,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Qr" component={Qr} options={{
          tabBarLabel: `Qr`,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="qr-code-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarLabel: `Profile`,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
