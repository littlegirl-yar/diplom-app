import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { Text, TouchableRipple, Surface, Button } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

const GarageScreen = ({ route, navigation }) => {
  const { garageId } = route.params;
  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  function onDismissSingle() {
    setOpen(false);
  }
  function onConfirmSingle(params) {
    setOpen(false);
    setDate(params.date);
  }

  const onDismissTime = () => {
    setVisible(false);
  }

  const onConfirmTime = ({ hours, minutes }) => {
    setVisible(false);
    console.log(date.toString())
    if (date) {
      let newDate = date;
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      newDate.setSeconds(0);
      setDate(newDate);
    }
  }

  const dateForOutput = (date) => {
    let stringDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    return stringDate
  }

  return (
    <View style={styles.container}>
      {/* first time picker */}
      <View style={styles.sectionContainer}>
        <Text>
          <Text style={styles.simpleText}>From: </Text>
          <Text style={[styles.simpleText, { fontWeight: "bold" }]}>{date && dateForOutput(date)}</Text>
        </Text>
        <View style={styles.timeContainer}>
          <View style={styles.buttonDateTime}>
            <Button onPress={() => setOpen(true)} uppercase={false} mode="contained" buttonColor='royalblue' textColor='white'>
              Select From Date
            </Button>
          </View>
          <View style={styles.buttonDateTime}>
            <Button onPress={() => setVisible(true)} uppercase={false} mode="contained" buttonColor='royalblue' textColor='white'>
              Select From Time
            </Button>
          </View>
          <DatePickerModal
            textColor='royalblue'
            locale="en"
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
            inputEnabled={false}
            startYear={2022}
            endYear={2028}
          />
          <TimePickerModal
            textColor='royalblue'
            visible={visible}
            onDismiss={onDismissTime}
            onConfirm={onConfirmTime}
            use24HourClock={true}
          />
        </View>
      </View>
      {/* second time picker */}
      <View style={styles.sectionContainer}>
        <Text>
          <Text style={styles.simpleText}>To: </Text>
          <Text style={[styles.simpleText, { fontWeight: "bold" }]}>{date && dateForOutput(date)}</Text>
        </Text>
        <View style={styles.timeContainer}>
          <View style={styles.buttonDateTime}>
            <Button onPress={() => setOpen(true)} uppercase={false} mode="contained" buttonColor='royalblue'textColor='white'>
              Select To Date
            </Button>
          </View>
          <View style={styles.buttonDateTime}>
            <Button onPress={() => setVisible(true)} uppercase={false} mode="contained" buttonColor='royalblue' textColor='white'>
              Select To Time
            </Button>
          </View>
          <DatePickerModal
            textColor='royalblue'
            locale="en"
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
            inputEnabled={false}
            startYear={2022}
            endYear={2028}
          />
          <TimePickerModal
            textColor='royalblue'
            visible={visible}
            onDismiss={onDismissTime}
            onConfirm={onConfirmTime}
            use24HourClock={true}
          />
        </View>
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