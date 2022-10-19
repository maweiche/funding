const Category = () => {
  const categories = {
    Technology: ["Gadgets", "Robots", "Wearables", "Other"],
    Games: ["Mobile", "Board", "Video", "Hardware", "Other"],
    Art: ["Film & Video", "Illustrations", "Performance", "Digital", "Publications", "Design", "Music", "Photography", "Other"],
    Web3: ["Defi", "DAO", "Gamefi", "NFT", "Social-fi", "Infrastrucute", "Dev tooling", "Other"],
    Science: ["Biology", "Ecologogy", "Psychology", "Chemistry", "Physics", "Engineering", "Medicine", "Neuroscience", "Other"],
    "Open-source": ["AI", "Big Data", "Cloud", "Cybersecurity", "IoT", "Machine Learning", "Dev tools", "Other"],
  }

  return (
    <div>
      <select name="category" onChange={(e) => console.log(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="pantone">Pantone</option>
        <option value="blueberry_dark">Blueberry Dark</option>
      </select>

      <select name="subcategory" onChange={(e) => console.log(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="pantone">Pantone</option>
        <option value="blueberry_dark">Blueberry Dark</option>
      </select>
    </div>
  )
}

export default Category
