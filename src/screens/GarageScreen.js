import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { Text, TouchableRipple, Surface, Button } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import DateTimePicker from '../components/DateTimePicker';

const GarageScreen = ({ route, navigation }) => {
  const { garageId } = route.params;
  const [toDate, setToDate] = React.useState(new Date());
  const [fromDate, setFromDate] = React.useState(new Date());

  const changeToDate = (selectedToDate) => {
    setToDate(selectedToDate);
  }

  const changeFromDate = (selectedFromDate) => {
    setFromDate(selectedFromDate);
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <DateTimePicker changeDateTime={changeFromDate} toOrFrom={"From"} minDate={new Date()} />
      </View>
      <View style={styles.sectionContainer}>
        <DateTimePicker changeDateTime={changeToDate} toOrFrom={"To"} minDate={fromDate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  simpleText: {
    fontSize: 20,
  },
  sectionContainer: {
    width: '90%',
    alignItems: "flex-start",
    margin: 7,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 7,
  },
  buttonDateTime: {
    width: "46%",
  },
});

export default GarageScreen;