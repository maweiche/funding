import { useState } from "react"
import Select from "react-select"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2%;
  margin-bottom: 2%;
  width: 50vw;
  gap: 20px;
`

const SiteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const NextButton = styled.div`
  background-color: #3c4048;
  padding: 10px 20px;
  border-radius: 5px;
`

const Category = () => {
  const [data, setData] = useState({ category: "", subcategory: "" })

  const categories = {
    Technology: ["Gadgets", "Robots", "Wearables", "Other"],
    Games: ["Mobile", "Board", "Video", "Hardware", "Other"],
    Art: ["Film & Video", "Illustrations", "Performance", "Digital", "Publications", "Design", "Music", "Photography", "Other"],
    Web3: ["Defi", "DAO", "Gamefi", "NFT", "Social-fi", "Infrastrucute", "Dev tooling", "Other"],
    Science: ["Biology", "Ecologogy", "Psychology", "Chemistry", "Physics", "Engineering", "Medicine", "Neuroscience", "Other"],
    "Open-source": ["AI", "Big Data", "Cloud", "Cybersecurity", "IoT", "Machine Learning", "Dev tools", "Other"],
  }

  const category = Object.keys(categories).map((cat) => ({ label: cat, value: cat }))
  const subcategory = categories[data.category] && categories[data.category].map((cat) => ({ label: cat, value: cat }))

  return (
    <SiteContainer>
      <Container>
        <Select className="select-category" placeholder="Select Category" options={category} onChange={(e) => setData((prev) => ({ ...prev, category: e.value }))} />
        <Select className="select-category" placeholder="Select SubCategory" options={subcategory} onChange={(e) => setData((prev) => ({ ...prev, subcategory: e.value }))} />
      </Container>

      <NextButton>Next</NextButton>
    </SiteContainer>
  )
}

export default Category
