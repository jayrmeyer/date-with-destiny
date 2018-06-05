// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  bungie: {
    apiKey: '92dbdf3924964a6e945cc774e646588d',
    apiUrl: 'https://www.bungie.net/Platform/',
    authUrl: 'https://www.bungie.net/en/OAuth/Authorize',
    clientId: '23391',
  },production: false
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


// ng serve --ssl --ssl-key "server.key" --ssl-cert "server.crt"
