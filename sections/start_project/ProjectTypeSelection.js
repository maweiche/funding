import styled from 'styled-components';
import FaqCard from '../../components/cards/FaqCard';
import Lottie from 'react-lottie';
import { useApp } from '../utils/appContext';
import blockchainAnimation from '../../data/blockchainAnimation.json'
import streamAnimation from '../../data/streamAnimation.json'
import {useState} from 'react';

const animOptions = {
    loop: true,
    autoplay: true,
    animationData: blockchainAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const streamOptions = {
    loop: true,
    autoplay: true,
    animationData: streamAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}

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
    background: ${props => props.color};
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 45px;
    margin: 1%;
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
    border-radius: 5px;
    margin: 2%;
    &:hover{
        cursor: pointer;
        opacity: 0.9;
    }
`

const TypeTitle = styled.div`
    font-size: 1.3em;
    font-family: 'Neucha';
    margin-top: 5%;
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
    const [standColor, setStandColor] = useState('radial-gradient(111.37% 111.37% at 50% 50%, rgba(137, 0, 171, 0.04) 0%, rgba(5, 0, 233, 0) 97.7%)')
    const [streamColor, setStreamColor] = useState('none')
    const { appState, setAppState } = useApp();
    const { pType } = { ...appState };

    const handleStandType = (type,color) => {
        setAppState({ ...appState, pType: type });
        setStandColor(color)
        setStreamColor('none')
    }

    const handleStreamType = (type,color) => {
        setAppState({ ...appState, pType: type });
        setStandColor('none')
        setStreamColor(color)
    }
    // Set type to 0 for crowdfunding, 1 for streaming, tbd save type to the context, well POST it to Moralis

    return <Container>
        <Title>Funding type (out of scope now)</Title>
        <Title>TBD UI + Some animation</Title>
       <Row> 
            <Col color={standColor}>
                <Clickable onClick={()=>{handleStandType('Standard','radial-gradient(111.37% 111.37% at 50% 50%, rgba(137, 0, 171, 0.05) 0%, rgba(5, 0, 233, 0) 97.7%)')}}>
                    <Lottie height={150} width={150} options={animOptions} />
                    <TypeTitle>Standard</TypeTitle>
                </Clickable>
                <TextBox><FaqCard answer={text.a1} point1={text.p11} point2={text.p12} point3={text.p13} point4={text.p14}/></TextBox>
            </Col>
            <Col color={streamColor}>
                <Clickable onClick={()=>{handleStreamType('Stream','radial-gradient(111.37% 111.37% at 50% 50%, rgba(0, 119, 12, 0.06) 0%, rgba(5, 0, 233, 0) 97.7%)')}}>
                    <Lottie height={150} width={150} options={streamOptions} />
                    <TypeTitle>Stream</TypeTitle>
                </Clickable>
                <TextBox><FaqCard answer={text.a1} point1={text.p21} point2={text.p22} point3={text.p23} point4={text.p24}/></TextBox>
            </Col>
        </Row>
    </Container>
}

export default ProjectTypeSelection