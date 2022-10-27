import { useRouter } from "next/router"
import type { NextPage } from "next";
import { useEffect, useState } from "react"
import styled from "styled-components"
import { useMoralisQuery } from 'react-moralis'

import Share from "../../components/Share"
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
      "pid"
    ]), [], { autoFetch: true },
  );

  const [image, setImage] = useState(null)
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
        <Share />
        <ProjectDetail 
          description={description} 
          title={title} 
          category={category} 
          subcategory={subcategory} 
          image={image} 
          bookmarks={bookmarks}
          pid={pid} />
      </Container>
    </>
  )
}

export default Project
