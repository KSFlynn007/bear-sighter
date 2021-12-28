# Bear Sighter
Interactive Google Map application built with [Create React App](https://github.com/facebook/create-react-app) for the purpose of posting bear sightings in popular hiking areas.

## Hosted on Heroku
See live application [here](https://bear-sighter.herokuapp.com/)

## Key Node Packages Used
- React v.17.0.2
- use-places-autocomplete v. 1.11.0
- react-googlemaps/api v. 2.7.0
- date-fns v. 2.27.0
- reach/combobox v. 0.16.5

## Key APIs Used
- Google Maps Javascript API
- Google Places API
- Google Geocoding API
- Geolocation API ([browser built-in](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API))

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## User Stories

### User Story 1:
As a user, I want to find a location by searching it.

```
Given the user has loaded the application
When they begin typing in a location in the search bar
The application will begin suggesting map locations
And the user can change their current position on the map
```

### User Story 2:
As a user, I want to find my current location. 

```
Given the user has loaded the application
When the user clicks the compass icon in the corner
And the user allows the browser to allow geolocation
Then the map will move and zoom to the user's current location
```

### User Story 3:
As a user, I want to be able to mark down a bear sighting.

```
Given the user has the map selected for their preferred location
When they user clicks a location on the map
Then the application will register a bear sighting
And a bear marker will appear at that location with the time/date of the sighting
```

### User Story 4:
As a user, I want to see other bear sightings previously marked.

```
Given the user has loaded the app
And other bear sightings are visible on the map
When the user clicks on a bear icon
Then a popup will appear that shows the time that bear was spotted
```

## Snazzy Maps 
Snazzy Maps is a great tool to customize and build Google maps visuals, for this project, I modified the style [Blue Essence](https://snazzymaps.com/style/61/blue-essence) to suit my design.

## Icon
Original bear PNG icon from [Freepik](https://www.flaticon.com/)
