import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, TouchableRipple, Surface, Button, Checkbox, SegmentedButtons } from 'react-native-paper';;
import axios from 'axios';
import { BASE_URL } from '../config';

const SpotsScreen = ({ route, navigation }) => {
  const { garageId, start, end, options, size } = route.params;
  const [spotsInfoLoading, setSpotsInfoLoading] = useState(true);
  const [spots, setSpots] = useState(undefined);

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
      console.log(spotsResponse);
      setSpots(spotsResponse);
      setSpotsInfoLoading(false);
    }
    catch (error) {
      console.log(`register error ${error}`);
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
          {spots && spots.map((s,i) => 
          (
            <Surface style={styles.spotSurface} key={spots.id} elevation={4}>
              <Text style={styles.spotText}>
                id: {s.id}
              </Text >
              <Text style={styles.spotText}>
                floor: {s.floor}
              </Text>
              <Text style={styles.spotText}>
                number: {s.number}
              </Text>
              <Text style={styles.spotText}>
                size: {s.size}
              </Text>
            </Surface>
          ))}
        </View>
      </View>
    </ScrollView>
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
    width: '91%',
    alignItems: "center",
    marginVertical: 7,
  },
  spotSurface: {
    padding: 10,
    width: "70%",
    borderRadius: 10,
    marginBottom: 7,
  },
  spotText: {
    fontSize: 16,
    marginBottom: 5
  }
});

export default SpotsScreen;