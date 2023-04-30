import React, { useContext, useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


const MapScreen = ({ navigation, route }) => {
  const { isLoading } = useContext(AuthContext);
  const [garagesLoading, setGaragesLoading] = useState(true);
  const [garages, setGarages] = useState([]);
  const mapRef = useRef(null);
  const zoomCords = route.params;

  const romaniaRegion = {
    latitude: 45.687800156448056,
    longitude: 25.067980774424424,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

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

  useEffect(() => {
    if (zoomCords === undefined) {
      return;
    }
    const zooomRegion = {
      latitude: zoomCords.zoomCords.lat,
      longitude: zoomCords.zoomCords.lng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };
    mapRef.current.animateToRegion(zooomRegion, 2 * 1000);
  }, [zoomCords]);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading || garagesLoading} />
      <MapView style={styles.map} ref={mapRef} initialRegion={romaniaRegion}>
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