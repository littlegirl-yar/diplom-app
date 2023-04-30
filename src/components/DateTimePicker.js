import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { useToast } from "react-native-toast-notifications";

const DateTimePicker = ({ changeDateTime, toOrFrom, minDate, }) => {
  const [date, setDate] = useState(undefined);
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const isFirstRender = useRef(true);
  const toast = useToast();

  const onDismissDate = () => {
    setOpenDate(false);
  }

  const onConfirmDate = (params) => {
    setOpenDate(false);
    if (params.date === undefined) {
      return
    }
    setDate(new Date(params.date));
  }

  const onDismissTime = () => {
    setOpenTime(false);
  }

  const onConfirmTime = ({ hours, minutes }) => {
    setOpenTime(false);
    if (date) {
      let newDate = new Date(date);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      newDate.setSeconds(0);
      if (newDate.getTime() < minDate) {
        toast.show('Picked time must be in future', { type: 'warning' });
        return
      }
      setDate(newDate);
    }
  }

  const formatDateForOutput = (inputDate) => {
    let year = inputDate.getFullYear();
    let month = `${inputDate.getMonth() + 1}`.padStart(2, "0");
    let day = `${inputDate.getDate()}`.padStart(2, "0");
    let minutes = `${inputDate.getMinutes()}`.padStart(2, "0");
    let hours = `${inputDate.getHours()}`.padStart(2, "0");
    let stringDate = [day, month, year].join("/") + ` ${hours}:${minutes}`;
    return stringDate
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return
    }
    changeDateTime(date)
  }, [date])

  return (
    <View>
      <Text>
        <Text style={styles.simpleText}>{toOrFrom}: </Text>
        <Text style={[styles.simpleText, { fontWeight: "bold" }]}>{date && formatDateForOutput(date)}</Text>
      </Text>
      <View style={styles.timeContainer}>
        <View style={styles.buttonDateTime}>
          <Button onPress={() => setOpenDate(true)} uppercase={false} mode="contained" buttonColor='royalblue' textColor='white'>
            Select {toOrFrom} Date
          </Button>
        </View>
        <View style={styles.buttonDateTime}>
          <Button onPress={() => setOpenTime(true)} uppercase={false} mode="contained" buttonColor='royalblue' textColor='white'>
            Select {toOrFrom} Time
          </Button>
        </View>
        <DatePickerModal
          textColor='royalblue'
          locale="en"
          mode="single"
          visible={openDate}
          onDismiss={onDismissDate}
          date={date}
          onConfirm={onConfirmDate}
          inputEnabled={false}
          startYear={2022}
          endYear={2026}
          validRange={{ startDate: minDate }}
        />
        <TimePickerModal
          textColor='royalblue'
          visible={openTime}
          onDismiss={onDismissTime}
          onConfirm={onConfirmTime}
          use24HourClock={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  simpleText: {
    fontSize: 20,
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

export default DateTimePicker;