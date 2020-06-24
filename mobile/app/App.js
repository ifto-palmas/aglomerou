
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import IdDispositivo from './componentes/IdDispositivo'
import LocalizacaoDispositivo from './componentes/LocalizacaoDispositivo'
import MapView from 'react-native-maps';

export default function App() {
  return (
    <View style={styles.container}>
      <IdDispositivo />
      <LocalizacaoDispositivo/>

      <MapView style={styles.mapStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
