import logo from './logo.svg';
import './App.css';

import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import {formatRelative} from 'date-fns';

import usePlacesAutocomplete, 
{
  getGeocode,
  getLatLng,
}
 from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox'

const libraries = ["places"];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};
const center = {
  lat: 51.180202,
  lng: -115.565704
}

function App() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries : libraries
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={center}
        ></GoogleMap>
    </div>
  );
}

export default App;
