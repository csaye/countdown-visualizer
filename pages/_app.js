import Head from 'next/head';

import '../styles/globals.css';

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Countdown Visualizer</title>
        <meta name="description" content="Visualize your next deadline." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
