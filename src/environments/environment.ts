// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'chatsterv2',
    appId: '1:686248898913:web:0bbb335f335a9dc3ffd520',
    storageBucket: 'chatsterv2',
    locationId: 'us-central',
    apiKey: 'AIzaSyCGsPpdrtJxUXzxp8K7jmM488146KEYDnQ',
    authDomain: 'chatsterv2.firebaseapp.com',
    messagingSenderId: '686248898913',
  },
  stripe: {
    key: 'sk_test_51LOmISGgB96LAeCntnmZcpAKzcLPmbOQChvWgFbAzieSD4L7H5uxBE773qzOgzx0PaAClqLMXGQHlOgh7NgYTiG700jll6zune'
  }
  ,
  production: false
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
