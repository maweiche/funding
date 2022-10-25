import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { useMoralisQuery } from 'react-moralis'

import ProjectDetail from "../../sections/ProjectDetail"

// Blockchain related 
import donation from '../../abi/donation.json'
import { useContractRead } from 'wagmi'


const Container = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
`

const Project = () => {
  const router = useRouter()
  const { objectId } = router.query 

  var microActive = "N/A"

  const { data } = useMoralisQuery("Project", (query) => query.equalTo("objectId", objectId));
  const fetchDetail = JSON.parse(
    JSON.stringify(data, [
      "title",
      "description",
      "category",
      "subcategory",
      "pid"
    ]), [], { autoFetch: true },
  );

  const [image, setImage] = useState(null)
  const [title, setTitle] = useState("Default Title")
  const [description, setDescription] = useState("Default Description")
  const [category, setCategory] = useState(null)
  const [subcategory, setSubcategory] = useState(null)
  const [pid, setPid] = useState(null)

  const [amPledged, setAmPledged] = useState("N/A")
  const [amBackers, setAmBackers] = useState("N/A")
  const [amMicro, setAmMicro] = useState("N/A")
  const [amDays, setAmDays] = useState("N/A")
  const [amGoal, setAmGoal] = useState("N/A")



  const getData = async () => {
    try {
      await setTitle(fetchDetail[0].title)
      await setDescription(fetchDetail[0].description)
      await setCategory(fetchDetail[0].category)
      await setSubcategory(fetchDetail[0].subcategory)
      await setPid(fetchDetail[0].pid)

      const micros = useContractRead({
        addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
        contractInterface: donation.abi,
        functionName: 'getConnectedMicroFunds',
        chainId: 80001,
        args: [pid],
        watch: false,
      })
    
      if (micros.data){
        microActive = micros.data.toString()
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [!fetchDetail[0]])


  return (
    <>
      <Container>
        <ProjectDetail 
          description={description} 
          title={title} 
          category={category} 
          subcategory={subcategory} 
          amBackers={amBackers} 
          amMicro={amMicro} 
          amPledged={amPledged} 
          amDays={amDays} 
          amGoal={amGoal} 
          image={image} 
          microActive={microActive} />
      </Container>
    </>
  )
}

export default Project
