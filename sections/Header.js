import { useState } from "react"
import { useConnect, useAccount, useDisconnect,useSignMessage } from "wagmi"
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import axios from 'axios';

import Link from "next/link"
import Image from "next/image"
import Logo from "../public/Logo.png"
import styled from "styled-components"

const NavItem = styled.div`
  display: flex;
  font-size: 1.6em;
  font-family: "Gemunu Libre", sans-serif;
  font-style: normal;
  align-items: center;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1em;
    flex-wrap: wrap;
  }
`

const HeadBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  color: #b0f6ff;
  padding: 10px 50px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const ImageBox = styled.div`
  display: block;
  @media (max-width: 768px) {
    font-size: 0.8em;
    flex-wrap: wrap;
    padding-right: 10%;
    right: 0;
  }

  &:hover {
    cursor: pointer;
  }
`

const MenuBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;

  @media (max-width: 960px) {
    padding: 0;
    flex-wrap: wrap;
    display: none;
  }
`

const ConnectBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`

const A = styled.div`
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`

const AB = styled(A)`
  font-weight: bold;
`

const IconFrame = styled.div`
  display: flex;
  align-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid white;
  padding: 4px;
  border-radius: 5px;
`

const ConnectBtn = styled.div`
  background-color: #628e90;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  color: #b0f6ff;
  font-family: "Gemunu Libre", sans-serif;
  font-style: normal;
  cursor: pointer;
`

const Header = () => {
  const { isConnected } = useAccount()
  const { disconnect, disconnectAsync } = useDisconnect()
  const { connect, connectors, connectAsync  } = useConnect()
  const [active, setActive] = useState("Home")
  const header = [
    { title: "Discover", url: "" },
    { title: "Start a project", url: "/startproject" },
    { title: "FAQ", url: "" },
    { title: "My projects", url: "/my" },
  ]

  const { signMessageAsync } = useSignMessage()

  // TBD we'll need to replace basic Wagmi auth with next/auth to 


  const handleAuth = async () => {
    //disconnects the web3 provider if it's already active
    if (isConnected) {
      await disconnectAsync();
    }
    // enabling the web3 provider metamask
    const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() });

    const userData = { address: account, chain: chain.id, network: 'evm' };
    // making a post request to our 'request-message' endpoint
    try{
      const { data } = await axios.post('/api/auth/request-message', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const message = data.message;
      const signature = await signMessageAsync({ message });
  
      console.log(signature)
    } catch(error){
      console.log(error)
    }
  };

  return (
    <>
      <HeadBox>
        <ImageBox>
          <NavItem
            onClick={() => {
              setActive("Home")
            }}
          >
            <Link href="/">
              <A>
                <Image src={Logo} alt="Logo" width={"110%"} height={"50%"} />
              </A>
            </Link>
          </NavItem>
        </ImageBox>

        <MenuBox>
          {header.map((h, index) => {
            const { title, url } = h

            return (
              <NavItem
                key={index}
                onClick={() => {
                  setActive(title)
                }}
              >
                {active === title ? (
                  <Link href={url}>
                    <AB>{title}</AB>
                  </Link>
                ) : (
                  <Link href={url}>
                    <A>{title}</A>
                  </Link>
                )}
              </NavItem>
            )
          })}
        </MenuBox>

        <ConnectBox>
          {connectors.map((connector) => (
            <ConnectBtn disabled={!connector.ready} key={connector.id} onClick={() => (isConnected ? disconnect() : connect({ connector }))}>
              {isConnected ? "Disconnect" : connector.name}
              {!connector.ready && " (unsupported)"}
            </ConnectBtn>
          ))}
           <button onClick={() => handleAuth()}>Moralis Auth</button>

          <IconFrame>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </IconFrame>
        </ConnectBox>
      </HeadBox>
    </>
  )
}

export default Header
