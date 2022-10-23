import { useState } from 'react'

import Button from './Button'
import { useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi'
import styled from 'styled-components'
import token from '../../abi/token.json'


const Container = styled.div`

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
    const [myError, setMyError] = useState(null)
    const { address } = useAccount()
    const { config, error } = usePrepareContractWrite({
        addressOrName: process.env.NEXT_PUBLIC_AD_TOKEN,
        contractInterface: token.abi,
        functionName: 'approve',
        args: [process.env.NEXT_PUBLIC_AD_DONATOR, "5000"],
    })

    // TBD Disabled button -> Transform to "Connect button" for better UX
    // TBD loading + Error icon to handle better
    // TBD hardcoded value now
    // Nastylovat typy buttonů

    const { isLoading, isSuccess, isError, write } = useContractWrite(config)

    const handleApprove = async () => {
        await write?.()
    }

    return <Container>{isError && <>Error</>}
        {!address && <ErButton disabled text='Wallet not connected' width={'200px'}/>}
        {error && <div>Invalid amount or network</div>}
        {!isLoading && !isSuccess && address && <Button  width={'200px'} disabled={!write} onClick={() => handleApprove()} text='Approve' /> }
    </Container>
}

export default ApproveButton