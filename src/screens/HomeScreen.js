import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { Text, TouchableRipple, Surface } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const { userInfo, apiToken, isLoading, logout } = useContext(AuthContext);

  const { toggleTheme, isThemeDark } = React.useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wolcomContainer}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Welcome {userInfo.name}</Text>
      </View>
      <Surface style={[styles.surface, { marginTop: 0 }]} elevation={4}>
        <TouchableRipple style={styles.ripple} rippleColor="rgba(0, 0, 0, .32)" onPress={() => {navigation.navigate('Reservations') }} borderless>
          <Text style={styles.buttonText}>My reservations</Text>
        </TouchableRipple>
      </Surface>
      <Surface style={styles.surface} elevation={4}>
        <TouchableRipple style={styles.ripple} rippleColor="rgba(0, 0, 0, .32)" onPress={() => {toggleTheme() }} borderless>
          <Text style={styles.buttonText}>{isThemeDark ? 'Switch to Light' : 'Switch to Dark'}</Text>
        </TouchableRipple>
      </Surface>
      <Surface style={styles.surface} elevation={4}>
        <TouchableRipple style={styles.ripple} rippleColor="rgba(0, 0, 0, .32)" onPress={() => { logout() }} borderless>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableRipple>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonText: {
    fontSize: 20,
  },
  wolcomContainer: {
    marginVertical: 10,
    width: '91%',
    alignItems: "center",
  },
  ripple: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 10,
  },
  surface: {
    width: '90%',
    height: 60,
    borderRadius: 10,
    marginTop: 10
  },
});

export default HomeScreen;