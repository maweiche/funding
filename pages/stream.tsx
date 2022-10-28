import { useState, } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import { getDefaultProvider } from 'ethers'
import type { NextPage } from "next";
import { useAccount, useProvider, useSigner } from 'wagmi'


const Stream: NextPage = () => {
  //const {data: signer} = useSigner()
  const { address } = useAccount();
  const [recipient, setRecipient] = useState(address)
  const [flowRate, setFlowRate] = useState(1);
  const provider = useProvider()
  const { data: signer } = useSigner()

  async function createNewFlow() {
    const sf = await Framework.create({
      provider: provider,
      chainId: 80001
    })
    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;
    const flowRate = 1;
    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        receiver: address,
        flowRate: flowRate,
        superToken: DAIx
      });

      console.log("Creating your stream...");
      console.log(signer)
      const result = await createFlowOperation.exec(signer);
      console.log(result);

    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }

  return <>
    <div>
      <h2>Create a Flow</h2>
      <button
        onClick={() => {
          createNewFlow();
        }}
      >
        Create stream
      </button>

      <div>
        Result in console
        <p>
          <li>Recipient: {recipient}</li>
          <li>Flow: {flowRate}</li>
        </p>
      </div>
    </div>
  </>
}

export default Stream;