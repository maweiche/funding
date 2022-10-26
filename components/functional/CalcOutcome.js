import styled from "styled-components"; 
import { useContractRead} from 'wagmi'
import { useEffect, useState } from 'react'
import donation from '../../abi/donation.json'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
    border-radius: 15px;
    padding: 4%;
    background: rgba(0, 0, 0, 0.4);
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 1%;
`

const Item = styled.div`
    width: 50%;
    font-size: 1em;
    color: white;
    font-family: 'Gemunu Libre';
`

const Value = styled.div`
    font-style: italic;
    font-weight: 500;
    color: #FFFFFF;
    font-family: 'Gemunu Libre';
`

const Button = styled.button`
    background: linear-gradient(270.16deg, rgba(107, 255, 255, 0.05) 0.59%, rgba(107, 255, 255, 0) 99.41%);
    border: none;
    padding-top: 1%;
    padding-bottom: 1%;
    &:hover{
        cursor: pointer;
        background: linear-gradient(270.13deg, rgba(107, 255, 255, 0.2) 0.03%, rgba(173, 255, 255, 0) 99.44%);
    }
`




const CalcOutcome = ({amountD}) => {
    const [multi, setMulti] = useState("")
    const [conn, setConn] = useState("")

    const outcome = useContractRead({
        addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
        contractInterface: donation.abi,
        functionName: 'calcOutcome',
        args: [0, amountD]
      })
    
      const connections = useContractRead({
        addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
        contractInterface: donation.abi,
        functionName: 'calcInvolvedMicros',
        args: [0, amountD]
      })
    
      const calcMe = () => {
        setMulti((outcome.data).toString())
        setConn((connections.data).toString())
      }


    return <Container>
        <Row><Item>Microfund multiplier</Item><Value>{conn} X</Value></Row>
        <Row><Item>Fund receives (in total)</Item><Value>{multi} USDC</Value></Row>
        <Button onClick={()=>{calcMe()}}>Calculate donation impact</Button>

    </Container>
}

export default CalcOutcome