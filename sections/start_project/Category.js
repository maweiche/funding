import { useEffect, useState } from "react"
import { MainContainer, SiteContainer, Container, ButtonContainer, NextButton } from "./StyleWrapper"

import Select from "react-select"

const Category = () => {
  const [data, setData] = useState({ category: "", subcategory: "", isNext: false })

  const categories = {
    Technology: ["Gadgets", "Robots", "Wearables", "Other"],
    Games: ["Mobile", "Board", "Video", "Hardware", "Other"],
    Art: ["Film & Video", "Illustrations", "Performance", "Digital", "Publications", "Design", "Music", "Photography", "Other"],
    Web3: ["Defi", "DAO", "Gamefi", "NFT", "Social-fi", "Infrastrucute", "Dev tooling", "Other"],
    Science: ["Biology", "Ecologogy", "Psychology", "Chemistry", "Physics", "Engineering", "Medicine", "Neuroscience", "Other"],
    "Open-source": ["AI", "Big Data", "Cloud", "Cybersecurity", "IoT", "Machine Learning", "Dev tools", "Other"],
  }

  useEffect(() => {
    console.log(data)
    setData((prev) => ({ ...prev, isNext: data.category && data.subcategory }))
  }, [])

  const category = Object.keys(categories).map((cat) => ({ label: cat, value: cat }))
  const subcategory = categories[data.category] && categories[data.category].map((cat) => ({ label: cat, value: cat }))

  const handleClick = () => setData((prev) => ({ ...prev, isNext: false }))
  const handleCategory = (e) => setData((prev) => ({ ...prev, category: e.value }))
  const handleSubCategory = (e) => setData((prev) => ({ ...prev, subcategory: e.value, isNext: true }))

  return (
    <MainContainer>
      <SiteContainer>
        <Container>
          <Select className="select-category" placeholder="Select Category" options={category} onChange={handleCategory} />
          <Select className="select-category" placeholder="Select SubCategory" options={subcategory} onChange={handleSubCategory} />
        </Container>

        {data.isNext && (
          <ButtonContainer>
            <NextButton onClick={handleClick}>Next</NextButton>
          </ButtonContainer>
        )}
      </SiteContainer>
    </MainContainer>
  )
}

export default Category
