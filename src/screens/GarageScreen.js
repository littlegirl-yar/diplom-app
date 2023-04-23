import React, { useContext, useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { Text, TouchableRipple, Surface, Button, Checkbox } from 'react-native-paper';
import DateTimePicker from '../components/DateTimePicker';
import CheckBoxRow from '../components/CheckBoxRow';

const GarageScreen = ({ route, navigation }) => {
  const { garageId } = route.params;
  const [toDate, setToDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [options, setOptions] = useState([]);
  
  const changeOptions = (option, checked) => {
    if(!checked){
      setOptions([...options, option])
    }
    if(checked){
      setOptions(options.filter(o => o !== option))
    }
  }

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
      <View style={styles.sectionContainer}>
        <CheckBoxRow lable={"Electric"} optionValue={"electric"} onPressOption={changeOptions} />
        <CheckBoxRow lable={"For Women"} optionValue={"for_women"} onPressOption={changeOptions} />
        <CheckBoxRow lable={"Handicapped"} optionValue={"handicapped"} onPressOption={changeOptions} />
        <CheckBoxRow lable={"With Kids"} optionValue={"with_kids"} onPressOption={changeOptions} />
        <Button onPress={()=>{console.log(options)}}>click me</Button>
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
  }
});

export default GarageScreen;