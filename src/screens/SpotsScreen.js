import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, TouchableRipple, Surface, Button, Chip } from 'react-native-paper';;
import axios from 'axios';
import { BASE_URL } from '../config';
import * as WebBrowser from 'expo-web-browser';
import { useToast } from "react-native-toast-notifications";

const SpotsScreen = ({ route, navigation }) => {
  const { garageId, start, end, options, size } = route.params;
  const [spotsInfoLoading, setSpotsInfoLoading] = useState(true);
  const [spots, setSpots] = useState(undefined);
  const [selectedSpotId, setSelectedSpotId] = useState(undefined);
  const [reservationId, setReservationId] = useState(undefined);
  const [price, setPrice] = useState(null);
  const [resultWeb, setResultWeb] = useState(null);
  const toast = useToast();

  const buildFilterUrl = () => {
    const searchParams = new URLSearchParams();
    options.forEach((entry) => {
      searchParams.append('attributes[]', entry)
    });
    searchParams.append("start", start)
    searchParams.append("end", end)
    searchParams.append("size", size)
    return searchParams.toString()
  }

  const getSpots = async () => {
    try {
      setSpotsInfoLoading(true);
      const response = await axios.get(`${BASE_URL}/garages/${garageId}/spots?${buildFilterUrl()}`);
      let spotsResponse = response.data.data;
      setSpots(spotsResponse);
      setSpotsInfoLoading(false);
    }
    catch (error) {
      toast.show(error.response.data.message + '' + Object.values(error.response.data.errors), { type: 'danger' });
      setSpotsInfoLoading(false);
    }
  }

  const selectSpot = async (sId) => {
    try {
      if (sId === selectedSpotId) return;
      setSelectedSpotId(sId);
      setSpotsInfoLoading(true);

      let response = await axios.post(`${BASE_URL}/reservations`, { start: start, end: end, spot_id: sId });
      let reservationResponse = response.data.data;
      setReservationId(reservationResponse.id);

      response = await axios.post(`${BASE_URL}/calculate-payment`, { reservation_id: reservationResponse.id });
      let priceResponse = response.data;
      setPrice(priceResponse)

      setSpotsInfoLoading(false);
    }
    catch (error) {
      toast.show(error.response.data.message, { type: 'danger' });
      setSpotsInfoLoading(false);
    }
  }

  const getCheckoutFrom = async () => {
    try {
      if (price === null) {
        toast.show('Select a spot, please', { type: 'warning' });
        return;
      }
      setSpotsInfoLoading(true);
      const response = await axios.get(`${BASE_URL}/checkout/${reservationId}`);
      let stripeResponse = response.data;
      let result = await WebBrowser.openBrowserAsync(stripeResponse.url);
      setResultWeb(result);
      navigation.navigate('Map')
      setSpotsInfoLoading(false);
    }
    catch (error) {
      toast.show(error.message, { type: 'danger' });
      setSpotsInfoLoading(false);
    }
  }

  useEffect(() => {
    getSpots();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Spinner visible={spotsInfoLoading} />
        <View style={styles.sectionContainer}>
          {spots && <>
            <Text style={styles.title}>{spots.length} Spots available</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>Price: {price / 100}$</Text>
              <Button onPress={() => { getCheckoutFrom() }} mode="contained" buttonColor='royalblue' textColor='white'>Continue to payment</Button>
            </View>
          </>}
          {spots && spots.map((s, i) =>

            <TouchableRipple key={s.id} style={styles.ripple} rippleColor="rgba(0, 0, 0, .32)" onPress={() => { selectSpot(s.id) }} borderless>
              <Surface style={[styles.spotSurface, s.id === selectedSpotId ? styles.spotSelected : null]} elevation={2} >
                <Text style={styles.spotText}>
                  <Text>Floor </Text>
                  <Text style={{ fontWeight: "bold" }}>{s.floor}</Text>
                </Text>
                <Text style={styles.spotText}>
                  <Text>Spot no. </Text>
                  <Text style={{ fontWeight: "bold" }}>{s.number}</Text>
                </Text>
                <View style={styles.rowChips}>
                  {
                    s.attributes.map((a, ai) =>
                      <Chip elevated={true} onPress={() => { }} style={styles.chip} textStyle={{ color: "royalblue" }} key={ai}>{a}</Chip>
                    )
                  }
                </View>
              </Surface>
            </TouchableRipple>

          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rowChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 8,
  },
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
  spotSurface: {
    padding: 10,
    width: "100%",
    borderRadius: 10,
    marginBottom: 7,
    borderWidth: 1
  },
  spotSelected: {
    borderColor: "royalblue",
  },
  spotText: {
    fontSize: 16,
    marginBottom: 5
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green"
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
});

export default SpotsScreen;