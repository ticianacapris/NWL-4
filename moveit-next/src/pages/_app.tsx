import { AppProps } from 'next/app'
import React from 'react'

import GlobalStyles from '../styles/global'

import Header from '../components/Header'

import { CountdownProvider } from '../contexts/CountdownContext'
import { ThemesProvider } from '../contexts/ThemeContext'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThemesProvider>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </ThemesProvider>
  )
}

export default MyApp;
