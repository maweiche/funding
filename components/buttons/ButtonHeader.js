import { useConnect, useAccount, useDisconnect } from "wagmi"
import styled from "styled-components"

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

const ButtonHeader = () => {
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect, connectors } = useConnect()

  return (
    <>
      {connectors.map((connector) => (
        <ConnectBtn disabled={!connector.ready} key={connector.id} onClick={() => (isConnected ? disconnect() : connect({ connector }))}>
          {isConnected ? "Disconnect" : connector.name}
          {!connector.ready && " (unsupported)"}
        </ConnectBtn>
      ))}
    </>
  )
}

export default ButtonHeader
