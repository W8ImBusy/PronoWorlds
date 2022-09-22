// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDYNQFsCg0MRRVm5h_2GlRLCWsxLRJVLvI",
    authDomain: "pronoworlds.firebaseapp.com",
    databaseURL: "https://pronoworlds-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pronoworlds",
    storageBucket: "pronoworlds.appspot.com",
    messagingSenderId: "448366362482",
    appId: "1:448366362482:web:1b4a1643e174b4465fe7eb"
  },
  signedIn: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
