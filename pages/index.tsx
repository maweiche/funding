import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styled from "styled-components"
import { useRouter } from "next/router"
import Eye7 from "../public/Eye7.png"
import { useEffect, useState } from "react"
import Script from "next/script"

import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { signIn } from "next-auth/react"
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi"
import axios from "axios"

import Header from "../sections/Header"
import Footer from "../sections/Footer"
import Features from "../sections/Landing/Features"
import LatestProjects from "../sections/Landing/LatestProjects"

const Container = styled.div`
  margin-top: 1%;
`

const EyeSevenBox = styled.div`
  text-align: center;
  position: relative;
`

const Home: NextPage = () => {
  const [projects,setProjects] = useState([])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    getProjects()
  }, [])

  // How to query categories https://aa6nfdqx573p.usemoralis.com:2053/server/classes/ProjectTest?where={%22category%22:"some category"}
  // Similar way possible to filter max if needed
  const getProjects = async () => {
      const config = {
      headers: {
        "X-Parse-Application-Id": "4PdSQUwrX1404TxN641gEwmXZqZFpv8CzBIc4FLN"
      }
    }
    try{
      const res = await axios.get("https://aa6nfdqx573p.usemoralis.com:2053/server/classes/ProjectTest?", config)
      setProjects(res.data.results)
    } catch (error){
      console.log(error)
    }
  }

  // Web3 Auth handling
  const { connectAsync } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { push } = useRouter()

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync()
    }

    const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() })

    const userData = { address: account, chain: chain.id, network: "evm" }
    console.log(userData)

    const { data } = await axios.post("/api/auth/request-message", userData, {
      headers: {
        "content-type": "application/json",
      },
    })

    const message = data.message

    const signature = await signMessageAsync({ message })
    // @ts-ignore
    const { url } = await signIn("credentials", { message, signature, redirect: false, callbackUrl: "/" })
    push(url)
  }

  return (
    <Container>
      <Head>
        <title>Eyeseek Fund</title>
        <meta name="title" content="Blockchain crowdfunding application powered by Moralis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Features/>
      <LatestProjects data={projects}/>

      <EyeSevenBox>
        <Image src={Eye7} alt="Eye7" width={"600%"} height={"70%"} />
      </EyeSevenBox>
      <Footer />
      {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-TKH8YE4L07"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TKH8YE4L07');
        `}
      </Script> */}
    </Container>
  )
}

export default Home
