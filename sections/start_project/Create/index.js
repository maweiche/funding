import { useEffect, useState } from "react";
import { useApp } from "../../utils/appContext";

import SectionTitle from "../../../components/typography/SectionTitle";
import { ButtonRow } from "../SetRewards/StyleWrapper";
import { MainContainer, NextButton } from "../Category/StyleWrapper";
import { RulesContainer, RulesTitle, WarningBox, Li, Row, ImageBox } from "./StyleWrapper";
import FaqCard from "../../../components/cards/FaqCard";
import { BookIcon } from "../../../components/icons/Common";
import donation from '../../../abi/donation.json'

import { usePrepareContractWrite, useContractEvent, useContractWrite, useNetwork } from "wagmi";
import axios from "axios";

const texts = {
    title: 'Rules to follow to be eligible of Eyeseek funding',
    p1: "Owner has to inform regularly backers with project updates",
    p2: "Projects must create something to share with others",
    p3: "Projects and backer statistics must be honest and clearly presented",
    p4: "Projects can't involve prohibited items",
}

const dummy = {
    // For smart contract we need only target amount
    amount: 500000
}

const Create = ({ setStep }) => {
    const { appState, setAppState } = useApp();
    const {chain} = useNetwork()
    const [ev, setEv] = useState(false)
    const [error, setError] = useState(false)


    // Gather all data from the context to fill in Moralis API
    useEffect(() => {
    }, []);


    const useEv = (e) => {
      setEv(true)
      console.log(e)
    }

    const handleBack = () => {
        setStep((prev) => (prev -= 1));
    }

    const {config}  = usePrepareContractWrite({
        addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
        contractInterface: donation.abi,
        functionName: 'createFund',
        args: [dummy.amount, 0],
      })

    const { write } = useContractWrite(config)

    const handleContract = async () => {    
        write?.()
    }
    
    const handleMoralis = async () => {
        const head = {
            headers: {
              "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
              "Content-Type": "application/json"
            }
          }
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project`, {                 
                "title": "Default project title (UI)",
                "description": "Default project description (UI)",
                "category": "Web3",
                "subcategory": "NFT",
                "owner": "0xa0a39c5823A51184043655711C8157ef4826447a",
                "state":  0, // Always 0 for new projects
                "chain": "mumbai" 
            }, head)
            console.log(res)
          } catch (error) {
            console.log(error)
            setError(true)
          }
    }

    // Wait until the event to confirm the event 
    // After confirmation, it's needed to inform user on the screen
    // After confirmation, it's needed to PUT data to Moralis API, update state to "1"
    // Blockchains generates "projectId (pid)"" - it will be needed to update to PUT request
    // PID is tricky to get :) either needed to debug event log (decode useContractEvent), or we will update smart contract and "useContractRead" for special function 
    // Out of scope - Not implemented yet event if transaction fails 

    
    useContractEvent({
        addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
        contractInterface: donation.abi,
        eventName: 'FundCreated',
        listener: (event) => useEv(event),
        once: true
      })
    


    return (
        <MainContainer>
            <SectionTitle title='Create project' subtitle='Meet crowdfunding rules' />
            <RulesContainer>
                <i>Rough scope to create a project</i> 
                {chain && !chain.name === 'Mumbai' && <>Go to Mumbai</>}
                <RulesTitle>Conditions and rules</RulesTitle>
                <WarningBox>
                    <Li>If any of your goals are not met in 30 days of crowdfunding period, collected resources will be returned back to the backers. No fees will be collected by Eyeseek.</Li>
                    <Li>If your project is sucessfully funded, Eyeseek will collect 1% fee from the funding total.2</Li>
                    <Row>
                        <ImageBox><BookIcon width={150}/></ImageBox>
                        <FaqCard answer={texts.title} point1={texts.p1} point2={texts.p2} point3={texts.p3} point4={texts.p4} />
                    </Row>
                </WarningBox>

                <ButtonRow>
                    <NextButton onClick={handleBack}>Back</NextButton>
                    <NextButton onClick={handleContract} disabled={!write}>Create project (contract)</NextButton> 
                    <NextButton onClick={handleMoralis}>Create project (moralis)</NextButton>
                </ButtonRow>
                {ev && <p>It works</p>}
                {error && <p>Moralis error</p>}
            </RulesContainer>
        </MainContainer>
    );
};

export default Create;
