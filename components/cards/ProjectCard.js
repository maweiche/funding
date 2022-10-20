import styled from 'styled-components'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import ImgSkeleton from '../skeletons/ImgSkeleton'
import Tag from "../../components/typography/Tag"

// Blockchain related 
import donation from '../../abi/donation.json'
import { useContractRead } from 'wagmi'

const A = styled(Link)`
    &:hover{
        text-decoration: none;  
    }
`

const Container = styled.div`
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: nowrap;
    height: 500px;
    width: 35%;
    max-width: 500px;
    padding: 2%;
    margin-top: 3%;
    &:hover{
        opacity: 0.8;
        cursor: pointer;
    }
    @media (max-width: 768px) {
        width: 100%;
        padding: 5%;
        margin-top: 7%;
    }
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Amount = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    color: #00FFA3;
`

const Title = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 1.5em;
    color: #FFFFFF;
    margin-top: 5%;
`

const Desc = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    color: #FFFFFF;
    margin-top: 5%;
`

const ProjectCard = ({ image, title, description, category, subcategory, link, id }) => {
    const [pId, setId] = useState(null)

    const { data } = useContractRead({
        addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
        contractInterface: donation.abi,
        functionName: 'getFundInfo',
        chainId: 80001,
        args: [pId],
        watch: false,
    })

    var balance = 0
    var cap = 0

    if (data) {
        balance = data.balance.toString()
        cap = data.max.toString()
    }

    useEffect(() => {
        setId(id), []
    })
    return <A href={link}>
        <Container>
            <div> {!image ? <ImgSkeleton /> : <Image src={detail.image} alt={title} width={500} height={500} />}</div>
            <Row>
                <Row>
                    <div> {category && <Tag tag={category} color={"#000850"} />}</div>
                    <div>{subcategory && <Tag tag={subcategory} color={"#035201"} />}</div>
                </Row>
                <Amount>
                    {balance} / {cap}
                </Amount>
            </Row>
            <Title>{title}</Title>
            <Desc>{description}</Desc>
        </Container>
    </A>
}

export default ProjectCard