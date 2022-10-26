import Image from "next/image"
import styled from "styled-components"
import { useState } from 'react'
import axios from 'axios'

import Tag from "../components/typography/Tag"
import SectionTitle from "../components/typography/SectionTitle"
import ImgSkeleton from "../components/skeletons/ImgSkeleton"
import {CancelIcon } from '../components/icons/Common'
import Tooltip from '../components/Tooltip'
import { CanceledTypo } from '../components/icons/Typography'
import ProjectDetailRight from "./ProjectDetailRight"

import donation from '../abi/donation.json'
import { useContractWrite, useNetwork, useContractEvent, usePrepareContractWrite } from 'wagmi'

const Container = styled.div`
  margin-top: 5%;
`

const DetailBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid #2f2f2f;
  padding: 3%;
  padding-left: 5%;
  margin-top: 5%;
  margin-left: 15%;
  margin-right: 15%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    margin: 1%;
    padding: 1%;
  }
`

const Categories = styled.div`
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const Desc = styled.div`
  margin-top: 2%;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 1em;
  line-height: 20px;
  color: #ffffff;
`

const LeftPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 5%;
    margin-top: 5%;
  }
`

const ActionPanel = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute; 
  right: 0;
  top: 0px;
  right: 4%;
`

const CancelProject = styled.button`
  position: relative;
  background: inherit;
  border: none;
  &:hover{
    cursor: pointer;
    opacity: 0.9;
  }
`

const CanceledBox = styled.div`
  position: absolute;
  transition: 0.5s;
  z-index: 1;
  top: -25%;
  right: 0;
  @media (max-width: 1068px) {
    top: 25%;
  }
`
// @param "my" indicates whether component visualized in context of MyProjects or Landing page
const ProjectDetail = ({ objectId, pid, title, description, category, subcategory, image, bookmarks, my }) => {
  const [cancelTooltip, setCancelTooltip] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const { chain } = useNetwork()

  // TBD add prepare contract write - To make blockchain part work

  const { write, isLoading } = useContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
    contractInterface: donation.abi,
    functionName: 'cancelFund',
    args: [pid],
  })


  useContractEvent({
    addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
    contractInterface: donation.abi,
    eventName: 'Cancelled',
    listener: () => setSuccess(true),
    once: true
  })

  const cancel = async (oid, pid) => {
   // await cancelMoralis(oid);
    await write(pid);
  }

  const cancelMoralis = async (oid) => {
    const config = {
      headers: {
        "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
        "Content-Type": "application/json"
      }
    }
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project/${oid}`, { 'state': 5 }, config)
      console.log(res)
      setSuccess(true)

    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  return  <Container>
    {my ? <SectionTitle title={'Active project'} subtitle={title} /> : <SectionTitle title={"Project detail"} subtitle={title} />}
    <DetailBox>
      {success && <CanceledBox><CanceledTypo width={400} /></CanceledBox>}
      {my && <ActionPanel>
        {!success && !isLoading ? <>
          {chain && chain.name === 'Mumbai' ?
            <CancelProject onClick={() => { cancel(objectId, pid) }} onMouseEnter={() => { setCancelTooltip(true) }} onMouseLeave={() => { setCancelTooltip(false) }}>
              {cancelTooltip && <Tooltip text='Cancel project' />}
              <CancelIcon width={30} />
            </CancelProject> :
            <CancelProject onMouseEnter={() => { setCancelTooltip(true) }} onMouseLeave={() => { setCancelTooltip(false) }}>
              {cancelTooltip && <Tooltip text='Switch to Mumbai' />}
              <CancelIcon width={30} />
            </CancelProject>
          }</> : <>Loading</>}
      </ActionPanel>}
      <LeftPart>
        {!image ? <ImgSkeleton /> : <Image src={detail.image} alt={title} width={500} height={500} />}
        <Categories>
          {category && <Tag tag={category} color={"#000850"} />}
          {subcategory && <Tag tag={subcategory} color={"#035201"} />}
        </Categories>
        <Desc>{description}</Desc>
      </LeftPart>
      <ProjectDetailRight pid={pid} objectId={objectId} bookmarks={bookmarks} />
    </DetailBox>
  </Container> 
}

export default ProjectDetail