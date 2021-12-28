import './App.css';
import mapStyles from './mapStyles';

import React, { useState } from 'react';
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
import "@reach/combobox/styles.css";

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

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
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

  const panTo = React.useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(14);
  }, []);  

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <h1>Bear Sighter{" "}
        <span role="img" aria-label="tent">🏕</span>
      </h1>

      <Search panTo={panTo}/>
      <Locate panTo={panTo}/>

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
            onClick={() => {
              setSelected(marker);
            }}
          />
        )}

        {/* InfoWindow is that pop up in google maps, takes one child */}
        {selected ? (
          <InfoWindow 
          position={{lat: selected.lat, lng: selected.lng}}
          // on closeClick prop needed to reset the state to null, otherwise, user can only open the info window box once
          onCloseClick={() => {
            setSelected(null);
          }}
          >
            <div>
              <h2>Bear Spotted</h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}

        </GoogleMap>
    </div>
  );
}

export default App;

function Locate({panTo}){
  return(  
  <button className='locate' onClick={() => {
    navigator.geolocation.getCurrentPosition((position) => {
      panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }, () => null);
  }}>
    <img src='/compass.svg' alt='compass - find me'/>
  </button>)
}


function Search({panTo}) {
  const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
    // sets default search options, like searching close to start position and within radius of 2km (in meters)
    requestOptions : {
      location: { lat: () => 51.180202, lng: () => -115.565704 },
      radius: 200 * 1000,
    }
  });

  return (
    <div className='search'>
      <Combobox 
        onSelect={async (address) => {
          // these two come from the usePlacesAutocomplete hook:
          setValue(address, false);
          clearSuggestions();

          try{
            const results = await getGeocode({address});
            // converts first result to lat and lng
            const {lat, lng} = await getLatLng(results[0])
            panTo({lat, lng});
          } catch(error) {
            console.log("Error!")
          }
        }}
        >
          <ComboboxInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            disabled={!ready}
            placeholder='Enter an address'
          />
            <ComboboxPopover>
              <ComboboxList>
              {status === "OK" && 
                data.map(({id, description}) => 
                <ComboboxOption 
                  key={id}
                  value={description} >

                </ComboboxOption>
              )}
              </ComboboxList>
            </ComboboxPopover>
      </Combobox>
    </div>
  )
};
 
