import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { Text, TouchableRipple, Surface } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const { userInfo, apiToken, isLoading, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wolcomContainer}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Welcome {userInfo.name}</Text>
      </View>
      <Surface style={[styles.surface, { marginTop: 0 }]} >
        <TouchableRipple style={styles.ripple} rippleColor="rgba(0, 0, 0, .32)" onPress={() => { }} borderless>
          <Text style={styles.buttonText}>My reservations</Text>
        </TouchableRipple>
      </Surface>
      <Surface style={styles.surface} elevation={1}>
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
    width: '90%',
    alignItems: "center",
  },
  ripple: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 50,
  },
  surface: {
    width: '90%',
    height: 60,
    borderRadius: 50,
    marginTop: 10
  },
});

export default HomeScreen;