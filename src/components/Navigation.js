import React, { useContext, } from 'react';
import { Appearance } from 'react-native';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import merge from 'deepmerge';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';
import MapScreen from '../screens/MapScreen';
import GarageScreen from '../screens/GarageScreen';
import SpotsScreen from '../screens/SpotsScreen';
import { AuthContext } from '../context/AuthContext';

const MapStack = createNativeStackNavigator();

function MapStackScreen() {
  return (
    <MapStack.Navigator>
      <MapStack.Screen name="Map" component={MapScreen} />
      <MapStack.Screen name="Garage" component={GarageScreen} />
      <MapStack.Screen name="Spots" component={SpotsScreen} />
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
      <Tab.Screen name="MapStack" component={MapStackScreen} options={{ headerShown: false, title: 'Map' }} />
      <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{ headerShown: false, title: 'Home' }} />
    </Tab.Navigator>
  );
}

const AuthStack = createNativeStackNavigator();

const colorScheme = Appearance.getColorScheme();

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const Navigation = () => {
  const { apiToken, splashLoading } = useContext(AuthContext);

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}>
      <AuthStack.Navigator>
        {splashLoading ? (
          <AuthStack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : apiToken.access_token ? (
          <AuthStack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
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