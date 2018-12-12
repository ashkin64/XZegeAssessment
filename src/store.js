import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// Reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5HW5HhuM-qKiMqDsPF9OBLO6TSBvRC1A",
    authDomain: "zegeinterview.firebaseapp.com",
    databaseURL: "https://zegeinterview.firebaseio.com",
    projectId: "zegeinterview",
    storageBucket: "zegeinterview.appspot.com",
    messagingSenderId: "1080437789279"
};

// react-redux-firebase configuration
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

//  Firebase instance initialization
firebase.initializeApp(firebaseConfig);
// Firestore initialization
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

// Check for settings in localStorage
if (localStorage.getItem('settings') == null) {
  // Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  // Set to localStorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// Create initial state
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
