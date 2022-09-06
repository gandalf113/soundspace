import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Soundspace</title>
        <meta name="description" content="Find your new favorite sound" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        Soundspace
      </main>


    </div>
  )
}
