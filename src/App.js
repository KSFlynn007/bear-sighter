import logo from './logo.svg';
import './App.css';
import mapStyles from './mapStyles';

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
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
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
      <h1>Bear Sighter{" "}
        <span role="img" aria-label="tent">🏕</span>
      </h1>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        ></GoogleMap>
    </div>
  );
}

export default App;
