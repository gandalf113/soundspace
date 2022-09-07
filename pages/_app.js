import { useContext, useEffect } from 'react'
import AuthProvider, { AuthContext } from '../context/auth-context'
import '../styles/globals.css'
import Authorizer from './authorizer'

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Authorizer>
        <Component {...pageProps} />
      </Authorizer>
    </AuthProvider>
  )
}

export default MyApp
