import styled from 'styled-components';
import FaqCard from '../../components/cards/FaqCard';
import { PiggyIcon, StreamIcon } from '../../components/icons/Landing';
import {useState} from 'react'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.3) -21.57%, rgba(0, 0, 0, 0.261) 100%);
    border: 1px solid #3C3C3C;
    border-radius: 5px;
`

const Row = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`

const Title = styled.div`
    text-align: center;
    font-size: 1.2em;
    font-family: 'Neucha';
`

const Col = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TextBox = styled.div`
    display: flex;
    padding: 5%;
    font-size: 0.9em;
`
const Clickable = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5%;
    margin: 2%;
    &:hover{
        cursor: pointer;
        opacity: 0.8;
        background: rgba(5, 0, 233, 0.02);
    }
   
`

const text = {
    a1: 'Recommended for starting projects looking for first resources.',
    p11: 'Kickstarter-like donations',
    p12: 'Crosschain-funding',
    p13: 'Crypto launchpad',
    p14: 'Microfund strategies',
    a2: 'Recommended for already built projects looking to fund open-source or non-profit activities.',
    p21: 'Single-chain payment streaming',
    p22: 'Supported only on polygon',
    p23: 'p3',
    p24: 'p4',
}

const ProjectTypeSelection = () => {
    const [type, setType] = useState(0)
    // Set type to 0 for crowdfunding, 1 for streaming, tbd save type to the context, well POST it to Moralis

    return <Container>
        <Title>Funding type (out of scope now)</Title>
        <Title>TBD UI + Some animation</Title>
       <Row> 
            <Col>
                <Clickable><PiggyIcon width={100}/><div>Standard</div></Clickable>
                <TextBox><FaqCard answer={text.a1} point1={text.p11} point2={text.p12} point3={text.p13} point4={text.p14}/></TextBox>
            </Col>
            <Col>
                <Clickable><StreamIcon width={100}/><div>Stream</div></Clickable>
                <TextBox><FaqCard answer={text.a1} point1={text.p21} point2={text.p22} point3={text.p23} point4={text.p24}/></TextBox>
            </Col>
        </Row>
    </Container>
}

export default ProjectTypeSelection