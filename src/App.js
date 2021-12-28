import logo from './logo.svg';
import './App.css';
import mapStyles from './mapStyles';

import React, { useCallback, useState, useRef } from 'react';
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

  const [markers, setMarkers] = useState([])
  // useCallback hook best for anytime you want to find a function that shouldn't ever change unless the props passed in depth array [] change
  // if you do nothing, this function will retain same value, not triggering re-render
  // using this instead of original below, which works but causes a re-render every time
  /* 
      onClick={(event) => {
      setMarkers(current => 
        [...current,
          {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(), 
            time: new Date()
          }
        ]
      )
      }}
  */
  const onMapClick = React.useCallback((event) => {
    setMarkers((current) => 
      [...current,
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(), 
          time: new Date()
        }
      ]);
  }, []);

  // useRef allows you to change state without causing a re-render
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

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
        onClick={onMapClick}
        onLoad={onMapLoad}
      >

        {markers.map(marker => 
          <Marker 
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: '/bear.svg',
              // scaledSize is in pix unit
              scaledSize: new window.google.maps.Size(30, 30),
              // origin and anchor are to make sure that the bear icon shows up exactly where the user's mouse/finger click is, rather than above it
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15)
            }}
          />
        )}



        </GoogleMap>
    </div>
  );
}

export default App;
