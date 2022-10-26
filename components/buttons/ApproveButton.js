import {useState} from 'react'
import Button from './Button'
import { useContractWrite, usePrepareContractWrite, useAccount, useContractRead, useContractEvent } from 'wagmi'
import styled from 'styled-components'
import token from '../../abi/token.json'
import Rainbow from './Rainbow'
import Lottie from "react-lottie";
import successAnimation from '../../data/successAnimation.json'
import errorAnimation from '../../data/errorAnimation.json'
import smallLoading from '../../data/smallLoading.json'

// Animation configs 
const okAnim = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const errAnim = {
    loop: false,
    autoplay: true,
    animationData: errorAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const loadingAnim = {
    loop: true,
    autoplay: true,
    animationData: smallLoading,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const Container = styled.div`
    position: relative;
`

const ApprovalBox = styled.div`
    position: absolute;
    bottom: 10px;
    left: 0;
    z-index: 50;
`

const ApButton = styled(Button)`
    border: 1px solid green;
`

const ErButton = styled(Button)`
    border: 1px solid red;
`

const LButton = styled(Button)`
    border: 1px solid grey;
`

const ApproveButton = (amount) => {
    const { address } = useAccount()
    const [ev, setEv] = useState(false)
    const [loading, setLoading] = useState(false)
    const [bColor, setBColor] = useState('green')

    const listened = () => {
        setEv(true)
    }
    const { config, error } = usePrepareContractWrite({
        addressOrName: process.env.NEXT_PUBLIC_AD_TOKEN,
        contractInterface: token.abi,
        functionName: 'approve',
        args: [process.env.NEXT_PUBLIC_AD_DONATOR, "5000"],
    })

    const {data} = useContractRead({
        addressOrName: process.env.NEXT_PUBLIC_AD_TOKEN,
        contractInterface: token.abi,
        functionName: 'allowance',
        args: [address, process.env.NEXT_PUBLIC_AD_DONATOR]
      })
    
    useContractEvent({
        addressOrName: process.env.NEXT_PUBLIC_AD_TOKEN,
        contractInterface: token.abi,
        eventName: 'Approval',
        listener: (event) => listened(event),
        once: true
      })
    
    // TBD hardcoded value now
    // TBD network check
    // If amount < approval => Mark red styling
    // If amount > approval => Mark green styling

    const { isError, write } = useContractWrite(config)

    const handleApprove = async () => {
        await write?.()
        setLoading(true)
    }

    return <Container>{isError && <>Error</>}

        <ApprovalBox>
            {ev && loading && <><Lottie height={30} width={30} options={okAnim} /></>} 
            {!ev && loading && <><Lottie height={50} width={50} options={loadingAnim} /></>}
        </ApprovalBox>
        {!address && <Rainbow/>}
        {error && <div>Invalid amount or network</div>}
        {address && 
         <Button  width={'200px'} disabled={!write} onClick={() => handleApprove()} text={<>
            {data && <>Approved: {data?.toString()} </>}</>} /> 
        }
    </Container>
}

export default ApproveButton