import FeatureCard from '../../components/cards/FeatureCard'
import { BlockchainIcon, MicrofundIcon, PiggyIcon, StreamIcon } from '../../components/icons/Landing'
import styled from 'styled-components'
import { useState } from 'react'
import Image from 'next/image'
import cross from '../../public/cross.gif'
import chaindonation from '../../public/chaindonation.gif'
import fee from '../../public/fee.gif'

const Container = styled.div`
    position: relative;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
`

const Texts = {
    title1: "Crosschain UX",
    description1: "No matter from which chain backers donate, thanks to the Axelar Network, total amount will sum up across all. Currently supported backing from Polygon, BNB Chain, Fantom.",
    title2: "Microfund concept",
    description2: "Backers can deploy microfunds instead of classic donations and each time someone after donates, the same amount is charged from all microfunds until they are depleted. With good strategy even $1 donation could have $100 impact.",
    title3: "5x cheaper than Kickstarter",
    description3: "Our infrastructure is powered by blockchain smart contracts, the infrastructure is much more cheaper than traditional crowdfunding companies like Kickstarter, which takes 5% platform fee for successful projects.",
    title4: "Money streaming",
    description4: "Already started project and need long-term support? Create a funding type using our crypto payment streaming, backers can flow resources real-time and turn on/off the streams based on your delivery."
}

const Features = () => {
    const [demoMicro, setDemoMicro] = useState(false)
    const [demoFunding, setDemoFunding] = useState(false)
    const [demoFee, setDemoFee] = useState(false)


    return <Container>
        <Row>
            {demoMicro ? <FeatureCard icon={<BlockchainIcon width={50} />} title={Texts.title1} description={<Image src={cross} layout='responsive' />} onClick={() => {setDemoMicro(!demoMicro) }}/> :
            <FeatureCard icon={<BlockchainIcon width={50} />} title={Texts.title1} description={Texts.description1} onClick={() => {setDemoMicro(!demoMicro) }} />}
            
            {demoFunding ? <FeatureCard icon={<MicrofundIcon width={50} />} title={Texts.title2} description={<Image src={chaindonation} layout='responsive' />} onClick={() => {setDemoFunding(!demoFunding) }}/> :
            <FeatureCard icon={<MicrofundIcon width={50} />} title={Texts.title2} description={Texts.description2} onClick={() => { setDemoFunding(!demoFunding) }} />
            }
        </Row>
        <Row>
            {demoFee ? <FeatureCard icon={<PiggyIcon width={50} />} title={Texts.title3} description={<Image src={fee} layout='responsive' />} onClick={() => {setDemoFee(!demoFee) }}/> :
            <FeatureCard icon={<PiggyIcon width={50} />} title={Texts.title3} description={Texts.description3} onClick={() => { setDemoFee(!demoFee) }}  />
           }
            <FeatureCard icon={<StreamIcon width={50} />} title={Texts.title4} description={Texts.description4} />
        </Row>
    </Container>
}

export default Features