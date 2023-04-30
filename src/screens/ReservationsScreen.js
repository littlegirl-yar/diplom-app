import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, TouchableRipple, Surface } from 'react-native-paper';;
import axios from 'axios';
import { BASE_URL } from '../config';
import { useToast } from "react-native-toast-notifications";

const ReservationsScreen = ({ navigation }) => {
  const [infoLoading, setInfoLoading] = useState(true);
  const [reservations, setReservations] = useState(undefined);
  const toast = useToast();

  const getSpots = async () => {
    try {
      setInfoLoading(true);
      const response = await axios.get(`${BASE_URL}/reservations`);
      let reservationResponse = response.data.data;
      setReservations(reservationResponse);
      setInfoLoading(false);
    }
    catch (error) {
      toast.show(error.message, { type: 'danger' });
      setInfoLoading(false);
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
    getSpots();
  }, []);

  const gotToMap = async (garageId) => {
    try {
      setInfoLoading(true);
      const response = await axios.get(`${BASE_URL}/garages/${garageId}/coordinates`);
      let cordsResponse = response.data;
      setInfoLoading(false);
      navigation.navigate('Map', { zoomCords: { lat: cordsResponse.lat, lng: cordsResponse.lng } })
    }
    catch (error) {
      toast.show(error.message, { type: 'danger' });
      setInfoLoading(false);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Spinner visible={infoLoading} />
        <View style={styles.sectionContainer}>
          {reservations &&
            <>
              <Text style={styles.title}>My Reservations</Text>
            </>}
          {reservations && reservations.map((r, i) =>
            <View key={r.id} style={styles.ripple}>
              <Surface style={[styles.resSurface, new Date(r.end) > new Date() ? styles.resSelected : null]} elevation={2}>
                <Text style={styles.resText}>
                  <Text>Id: </Text>
                  <Text style={{ fontWeight: "bold" }}>{r.id}</Text>
                </Text>
                <Text style={styles.resText}>
                  <Text>Uuid: </Text>
                  <Text style={{ fontWeight: "bold" }}>{r.uuid}</Text>
                </Text>
                <Text style={styles.resText}>
                  <Text>Start: </Text>
                  <Text style={{ fontWeight: "bold" }}>{formatDateForOutput(new Date(r.start))}</Text>
                </Text>
                <Text style={styles.resText}>
                  <Text>End: </Text>
                  <Text style={{ fontWeight: "bold" }}>{formatDateForOutput(new Date(r.end))}</Text>
                </Text>
                <View style={styles.toMapContainer}>
                  <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={() => { gotToMap(r.garage_id) }} borderless>
                    <Text style={styles.toMapText}>Go to Map</Text>
                  </TouchableRipple>
                </View>
              </Surface>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ripple: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sectionContainer: {
    width: '91%',
    alignItems: "center",
    marginVertical: 7,
  },
  resSurface: {
    padding: 10,
    width: "100%",
    borderRadius: 10,
    marginBottom: 7,
    borderWidth: 1
  },
  resSelected: {
    borderColor: "royalblue",
  },
  resText: {
    fontSize: 16,
    marginBottom: 5
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green"
  },
  toMapContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  toMapText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "royalblue",
  },
});

export default ReservationsScreen;