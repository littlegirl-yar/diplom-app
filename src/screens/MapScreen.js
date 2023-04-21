import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


const MapScreen = ({ navigation }) => {
  const { isLoading } = useContext(AuthContext);
  const [garagesLoading, setGaragesLoading] = useState(true);
  const [garages, setGarages] = useState([]);

  const getGarages = async () => {
    try {
      setGaragesLoading(true);
      const response = await axios.get(`${BASE_URL}/garages`);
      let garagesResponse = response.data.data;
      setGarages(garagesResponse);
      setGaragesLoading(false);
    }
    catch (error) {
      console.log(`register error ${error}`);
      setGaragesLoading(false);
    }
  }

  useEffect(() => {
    getGarages();
  }, []);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading || garagesLoading} />
      <MapView style={styles.map}>
        {
          garages ? garages.map((g, i) =>
            <Marker visible={garagesLoading}
              coordinate={{ latitude: g.coordinates.lat, longitude: g.coordinates.lng }}
              title={g.name}
              key={i}
              onPress={(e) =>
                navigation.navigate('Garage', {
                  garageId: g.id
                })}
            />
          ) : null
        }
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;