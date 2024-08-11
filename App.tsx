import { View, Text } from 'react-native'
import React from 'react'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import Navigation from './src/navigation/Navigation'

GoogleSignin.configure({
  webClientId :'493008654687-7pgduiu199nrm3r2hcaj697f6q5aeaso.apps.googleusercontent.com',
  forceCodeForRefreshToken:true,
  
})

const App = () => {
  return (
    <Navigation/>
  )
}

export default App