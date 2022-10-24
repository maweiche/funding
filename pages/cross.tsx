import React, { useState } from "react";
import { ethers } from 'ethers'
import type { NextPage } from "next";
import { useSigner, useNetwork, useContractWrite, useProvider, usePrepareContractWrite } from 'wagmi'
import {
  AxelarQueryAPI,
  EvmChain,
  GasToken,
} from "@axelar-network/axelarjs-sdk";

/// Crosschain functionality playground, separated from core scope
/// Under development

function truncatedAddress(address: string): string {
  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 4)
  );
}

const Cross: NextPage = () => {
  const [customRecipientAddress, setCustomRecipientAddress] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { data: signer } = useSigner()
  const provider = useProvider()

  const { config } = usePrepareContractWrite({
    // @ts-ignore
    address: '0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B', // Axelar gateway contract. different for each chain
    functionName: 'callContractWithToken',
    args: [EvmChain.POLYGON, 'destinationContract', 'payload(bytes)', 'MATIC', 5000] //Payload is critical to differentiate Micro/Donate pledges + owner
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)

// @ts-ignore
  const address = signer?._address;


  const sdk = new AxelarQueryAPI({
    // @ts-ignore
    environment: "testnet",
  });

  // 1. Gas estimation for crosschain transfers
  // (Optional) An estimated gas amount required to execute `executeWithToken` function. The default value is 700000 which sufficients for most transaction.
  const estimateGasUsed = 400000;

  const estimateGas = async () => {
    // Returns avax amount to pay gas from one side to another
    const gasFee = await sdk.estimateGasFee(
      EvmChain.POLYGON,
      EvmChain.FANTOM,
      // @ts-ignore
      GasToken.POLYGON,
      estimateGasUsed
    );

    console.log(gasFee)
  }

  /// Neeeded to create sending/receiving infrastructure - https://xchainbox.axelar.dev/


  // encoding a string
  const payload = ethers.utils.defaultAbiCoder.encode(
    ["string"],
    ["Hello from contract A"]
  );

  console.log(payload)

  return <>
    <h1>  General Message Passing (GMP)</h1>
    <h2>  Call Contract With Token</h2>
    {address && <p>{address}</p>}
    <div>
      <h3>Token amount</h3>
      <button onClick={() => { estimateGas() }}>Estimate gas</button>
      <div>
        <button disabled={!write} onClick={() => write?.()}>
          Call external contract
        </button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div>
      <input
        disabled={loading}
        required
        name="amount"
        type="number"
        placeholder="Enter amount to send"
      />
      <input
        type="text"
        placeholder="Enter address"
        value={customRecipientAddress}
        onChange={(e) =>
          setCustomRecipientAddress(e.target.value)
        }
      />
    </div>
  </>
}

export default Cross