import Head from "next/head"
import Header from "../sections/Header"
import "../styles/globals.css"

//Web3 auth
import { Chain, createClient, configureChains, WagmiConfig } from "wagmi"
import { AppProvider } from "../sections/utils/appContext"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { SessionProvider } from "next-auth/react"
import { MoralisProvider } from "react-moralis";
import '@rainbow-me/rainbowkit/styles.css';

const mumbai: Chain = {
  id: 80_001,
  name: "Mumbai",
  network: "mumbai",
  nativeCurrency: {
    decimals: 18,
    name: "MATIC",
    symbol: "MATIC",
  },
  rpcUrls: {
    default: "https://rpc-mumbai.maticvigil.com",
  },
  testnet: true,
}


const { provider, webSocketProvider } = configureChains([mumbai], [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY }), publicProvider()])


const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true
})

type AppProps = {
  Component: any
  pageProps: any
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig client={client}>
        <MoralisProvider appId="4PdSQUwrX1404TxN641gEwmXZqZFpv8CzBIc4FLN" serverUrl="https://aa6nfdqx573p.usemoralis.com:2053/server">
          <SessionProvider session={pageProps.session} refetchInterval={10000}>
              <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
                <meta name="description" content="Description" />
                <meta name="keywords" content="Keywords" />
                <title>Eyeseek fund</title>

                <link rel="manifest" href="/manifest.json" />
                <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
                <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                <meta name="theme-color" content="#317EFB" />
              </Head>
              <AppProvider>
                <Component {...pageProps} />
              </AppProvider>
          </SessionProvider>
        </MoralisProvider>
      </WagmiConfig>
    </>
  )
}
