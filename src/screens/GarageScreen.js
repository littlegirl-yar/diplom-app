import React, { useContext, useEffect, useState, } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { Text, TouchableRipple, Surface, Button, Checkbox, SegmentedButtons } from 'react-native-paper';
import DateTimePicker from '../components/DateTimePicker';
import CheckBoxRow from '../components/CheckBoxRow';
import axios from 'axios';
import { BASE_URL } from '../config';

const GarageScreen = ({ route, navigation }) => {
  const { garageId } = route.params;
  const [garageInfoLoading, setGarageInfoLoading] = useState(true);
  const [garageInfo, setGarageInfo] = useState(undefined);
  const [toDate, setToDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [options, setOptions] = useState([]);
  const [size, setSize] = React.useState('small');

  const changeOptions = (option, checked) => {
    if (!checked) {
      setOptions([...options, option])
    }
    if (checked) {
      setOptions(options.filter(o => o !== option))
    }
  }

  const changeToDate = (selectedToDate) => {
    setToDate(selectedToDate);
  }

  const changeFromDate = (selectedFromDate) => {
    setFromDate(selectedFromDate);
  }

  const getGarageInfo = async () => {
    try {
      setGarageInfoLoading(true);
      const response = await axios.get(`${BASE_URL}/garages/${garageId}`);
      let garagesResponse = response.data.data;
      setGarageInfo(garagesResponse);
      setGarageInfoLoading(false);
    }
    catch (error) {
      console.log(`register error ${error}`);
      setGarageInfoLoading(false);
    }
  }

  const showSpots = () => {
    if (toDate < new Date() || fromDate < new Date() || toDate.getTime() === fromDate.getTime() || fromDate > toDate) {
      console.log("cant show spots")
      return
    }
    navigation.navigate('Spots', {
      garageId: garageId,
      start: fromDate.toISOString(),
      end: toDate.toISOString(),
      options: options,
      size: size,
    });
  }

  useEffect(() => {
    getGarageInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Spinner visible={garageInfoLoading} />
      {garageInfo ? <>
        <Text style={styles.title}>{garageInfo.name}</Text>
        <View style={styles.sectionContainer}>
          <DateTimePicker changeDateTime={changeFromDate} toOrFrom={"From"} minDate={new Date()} />
        </View>
        <View style={styles.sectionContainer}>
          <DateTimePicker changeDateTime={changeToDate} toOrFrom={"To"} minDate={fromDate} />
        </View>
        <View style={styles.sectionContainer}>
          <CheckBoxRow lable={"Electric"} optionValue={"electric"} onPressOption={changeOptions} priceText={garageInfo.attributes.electric} />
          <CheckBoxRow lable={"For Women"} optionValue={"for_women"} onPressOption={changeOptions} priceText={garageInfo.attributes.for_women} />
          <CheckBoxRow lable={"Handicapped"} optionValue={"handicapped"} onPressOption={changeOptions} priceText={garageInfo.attributes.handicapped} />
          <CheckBoxRow lable={"With Kids"} optionValue={"with_kids"} onPressOption={changeOptions} priceText={garageInfo.attributes.with_kids} />
        </View>
        <View style={styles.sectionContainer}>
          <SegmentedButtons
            style={{ fontSize: 4 }}
            value={size}
            onValueChange={setSize}
            buttons={[
              { value: 'small', label: `Small ${garageInfo.sizes[0].price / 100}$/h`, checkedColor: 'royalblue', },
              { value: 'medium', label: `Medium ${garageInfo.sizes[1].price / 100}$/h`, checkedColor: 'royalblue', },
              { value: 'large', label: `Large ${garageInfo.sizes[2].price / 100}$/h`, checkedColor: 'royalblue', },
            ]}
          />
        </View>
        <View style={[styles.sectionContainer, { alignItems: "center" }]}>
          <Button onPress={() => { showSpots() }} mode="contained" buttonColor='royalblue' textColor='white'>
            Show available spots
          </Button>
        </View>
      </> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  simpleText: {
    fontSize: 20,
  },
  sectionContainer: {
    width: '91%',
    alignItems: "flex-start",
    marginVertical: 7,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
});

export default GarageScreen;