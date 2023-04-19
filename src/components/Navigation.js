import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import MapScreen from '../screens/MapScreen';
import GarageScreen from '../screens/GarageScreen';


const MapStack = createNativeStackNavigator();

function MapStackScreen() {
  return (
    <MapStack.Navigator>
      <MapStack.Screen name="Map" component={MapScreen} />
      <MapStack.Screen name="Garage" component={GarageScreen} />
    </MapStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'MapStack') {
                iconName = focused
                  ? 'map'
                  : 'map-outline';
              } else if (route.name === 'HomeStack') {
                iconName = focused ? 'home' : 'home-outline';
              }
  
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'royalblue',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="MapStack" component={MapStackScreen} options={{headerShown: false, title: 'Map'}}/>
          <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{headerShown: false, title: 'Home'}} />
        </Tab.Navigator>
      );
}

const AuthStack = createNativeStackNavigator();

const Navigation = () => {
  const {apiToken, splashLoading} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        {splashLoading ? (
          <AuthStack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : apiToken.access_token ? (
          <AuthStack.Screen name="TabNavigation" component={TabNavigation} options={{headerShown: false}}/>
        ) : (
          <>
            <AuthStack.Screen
              name="Login"
              component={LoginScreen}
            />
            <AuthStack.Screen
              name="Register"
              component={RegisterScreen}
            />
          </>
        )}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;