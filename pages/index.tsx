import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styled from "styled-components"
import { useRouter } from "next/router"
import Eye7 from "../public/Eye7.png"
import { useEffect } from "react"
import Script from "next/script"
import Link from "next/link"

import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { signIn } from "next-auth/react"
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi"
import axios from "axios"

import Header from "../sections/Header"
import Footer from "../sections/Footer"
import Title from "../components/typography/Title"
import Subtitle from "../components/typography/Subtitle"
import Button from "../components/buttons/Button"
import { HottestProjects, TopChainReactions,  } from "../components/statsTable/statsTable"
import StatsTable from "../components/statsTable/statsTable"
const Container = styled.div`
  margin-top: 1%;
`

const EyeSevenBox = styled.div`
  text-align: center;
  position: relative;
`
const A = styled.a`
  &:hover {
    opacity: 0.7;
    color: blue;
    cursor: pointer;
  }
`

const Home: NextPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [])

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

    // redirect user after success authentication to '/dashboard' page
    // @ts-ignore
    const { url } = await signIn("credentials", { message, signature, redirect: false, callbackUrl: "/user" })
    /**
     * instead of using signIn(..., redirect: "/dashboard")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
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
      <Title text="Components/Typography/Title" />
      <Subtitle text="Components/Typography/Subtitle" />
      <Button text={"Components/buttons/button"} />
      <div>
        <br></br>
        <Link href="/project/abc">
          <A>pages/project/[pid].js</A>
        </Link>
        <div>This link will be userful for features "My projects", "Latest projects", "Stats" ,etc.</div>
      </div>
      <EyeSevenBox>
        <Image src={Eye7} alt="Eye7" width={"600%"} height={"70%"} />
      </EyeSevenBox>
      <StatsTable />
      <HottestProjects />

      <TopChainReactions />

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
