import { useRouter } from "next/router"
import type { NextPage } from "next";
import { useEffect, useState } from "react"
import styled from "styled-components"
import { useMoralisQuery } from 'react-moralis'

import ProjectDetail from "../../sections/ProjectDetail"

const Container = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
`

const Project: NextPage = () => {
  const router = useRouter()
  const { objectId } = router.query 
  const { data } = useMoralisQuery("Project", (query) => query.equalTo("objectId", objectId));
  const fetchDetail = JSON.parse(
    JSON.stringify(data, [
      "title",
      "description",
      "category",
      "subcategory",
      "bookmarks",
      "verified",
      "pid"
    ]), [], { autoFetch: true },
  );

  const [image, setImage] = useState(null)
  const [verified, setVerified] = useState(false)
  const [title, setTitle] = useState("Default Title")
  const [description, setDescription] = useState("Default Description")
  const [category, setCategory] = useState(null)
  const [subcategory, setSubcategory] = useState(null)
  const [pid, setPid] = useState(null)
  const [bookmarks, setBookmarks] = useState([])

  const getData = async () => {
    try {
      await setTitle(fetchDetail[0].title)
      await setDescription(fetchDetail[0].description)
      await setCategory(fetchDetail[0].category)
      await setSubcategory(fetchDetail[0].subcategory)
      await setPid(fetchDetail[0].pid)
      await setBookmarks(fetchDetail[0].bookmarks)
      await setVerified(fetchDetail[0].verified)

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
          image={image} 
          bookmarks={bookmarks}
          verified={verified}
          pid={pid} />
      </Container>
    </>
  )
}

export default Project
