import Head from 'next/head'
import '../styles/globals.css'
import { AppProps } from 'next/app'

//Web3 auth
import { Chain, createClient, configureChains, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';

const mumbai: Chain = {
  id: 80_001,
  name: 'Mumbai',
  network: 'mumbai',
  nativeCurrency: {
    decimals: 18,
    name: 'MATIC',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: 'https://rpc-mumbai.maticvigil.com',
  },
  testnet: true,
}

const { provider, webSocketProvider } = configureChains([mumbai],[
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY }),
  publicProvider(), ]);
  
  const client = createClient({
    provider,
    webSocketProvider,
    autoConnect: true,
  });

  type AppProps ={ 
    Component: any;
    pageProps: any;
}


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig client={client}>
           <SessionProvider session={pageProps.session} refetchInterval={10000}>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                  name="viewport"
                  content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />
                <meta name="description" content="Description" />
                <meta name="keywords" content="Keywords" />
                <title>Eyeseek fund</title>

                <link rel="manifest" href="/manifest.json" />
                <link
                  href="/icons/favicon-16x16.png"
                  rel="icon"
                  type="image/png"
                  sizes="16x16"
                />
                <link
                  href="/icons/favicon-32x32.png"
                  rel="icon"
                  type="image/png"
                  sizes="32x32"
                />
                <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                <meta name="theme-color" content="#317EFB" />
              </Head>
              <Component {...pageProps} />
          </SessionProvider>
      </WagmiConfig>
    </>
  )
}
