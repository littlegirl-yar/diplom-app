import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

const GarageScreen = ({ route, navigation }) => {
    const { garageInfo} = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Name: {JSON.stringify(garageInfo.name)}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default GarageScreen;