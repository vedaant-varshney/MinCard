import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { store } from 'redux/store';
import { Provider } from 'react-redux';


function MyApp({ Component, pageProps }: AppProps) {
  return (

    // Put provider here
    <>
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />


      </Provider>
    </>


  )
}

export default MyApp
