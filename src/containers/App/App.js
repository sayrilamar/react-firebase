import React from 'react'
import PropTypes from 'prop-types'
import { FirebaseAppProvider } from 'reactfire'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/performance'
import 'firebase/analytics'
import { initializeMessaging } from 'utils/firebaseMessaging'
import { setAnalyticsUser } from 'utils/analytics'
import { setErrorUser } from 'utils/errorHandler'
import ThemeSettings from 'theme'
import * as config from 'config'

const theme = createMuiTheme(ThemeSettings)

// Initialize Firebase instance
firebase.initializeApp(config.firebase)
// Initialize Firebase analytics if measurementId exists
if (config.firebase.measurementId) {
  firebase.analytics()
}
firebase.auth().onAuthStateChanged((auth) => {
  if (auth) {
    // Set auth within error handler
    setErrorUser(auth)
    // Initalize messaging
    initializeMessaging()
    // Set auth within analytics
    setAnalyticsUser(auth)
  }
})


function App({ routes }) {
  return (
    <MuiThemeProvider theme={theme}>
      <FirebaseAppProvider firebaseConfig={config.firebase} initPerformance>
        <Router>{routes}</Router>
      </FirebaseAppProvider>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  routes: PropTypes.object.isRequired
}

export default App
