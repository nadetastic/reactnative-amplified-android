/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {Linking} from 'react-native';
async function urlOpener(url, redirectUrl) {
    await InAppBrowser.isAvailable();
    const {type, url: newUrl} = await InAppBrowser.openAuth(url, redirectUrl, {
      showTitle: false,
      enableUrlBarHiding: true,
      enableDefaultShare: false,
      ephemeralWebSession: false,
    });

    // console.log('type', type);
    // console.log('newUrl', newUrl);
  
    if (type === 'success') {
      Linking.openURL(newUrl);
    }
}
  
  Amplify.configure({
    ...awsconfig,
    oauth: {
      ...awsconfig.oauth,
      redirectSignIn: 'dan://test', 
      redirectSignOut: 'dan://test',
      // urlOpener,
    },
  });


// Amplify.configure(awsconfig);




AppRegistry.registerComponent(appName, () => App);

