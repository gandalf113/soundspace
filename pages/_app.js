import Head from 'next/head'
import { useContext, useEffect } from 'react'
import Navbar from '../components/shared/layout/Navbar'
import AuthProvider, { AuthContext } from '../context/auth-context'
import UIProvider from '../context/ui-context'
import '../styles/globals.css'
import Authorizer from './authorizer'

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <UIProvider>
        <Head>
          <title>Soundspace</title>
          <meta name='description' content='Find new Spotify songs' />
        </Head>
        <Authorizer>
          <Component {...pageProps} />
        </Authorizer>
      </UIProvider>
    </AuthProvider>
  )
}

export default MyApp
