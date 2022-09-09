import Head from 'next/head'
import { useContext, useEffect } from 'react'
import Navbar from '../components/shared/layout/Navbar'
import AuthProvider, { AuthContext } from '../context/auth-context'
import '../styles/globals.css'
import Authorizer from './authorizer'

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Head>
        <title>Soundspace</title>
        <meta name='description' content='Find new Spotify songs' />
      </Head>
      <Authorizer>
        <Component {...pageProps} />
      </Authorizer>
    </AuthProvider>
  )
}

export default MyApp
