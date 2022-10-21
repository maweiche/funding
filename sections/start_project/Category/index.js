import { useEffect } from "react";
import { useApp } from "../../utils/appContext";
import { MainContainer, SiteContainer, Container, ButtonContainer, NextButton } from "./StyleWrapper";

import Select from "react-select";

const Category = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { category, subcategory, isNext } = { ...appState };

  const categories = {
    Technology: ["Gadgets", "Robots", "Wearables", "Other"],
    Games: ["Mobile", "Board", "Video", "Hardware", "Other"],
    Art: ["Film & Video", "Illustrations", "Performance", "Digital", "Publications", "Design", "Music", "Photography", "Other"],
    Web3: ["Defi", "DAO", "Gamefi", "NFT", "Social-fi", "Infrastrucute", "Dev tooling", "Other"],
    Science: ["Biology", "Ecologogy", "Psychology", "Chemistry", "Physics", "Engineering", "Medicine", "Neuroscience", "Other"],
    "Open-source": ["AI", "Big Data", "Cloud", "Cybersecurity", "IoT", "Machine Learning", "Dev tools", "Other"],
  };

  useEffect(() => {
    setAppState((prev) => ({ ...prev, isNext: subcategory !== undefined }));
  }, []);

  const categoryKey = Object.keys(categories).map((cat) => ({ label: cat, value: cat }));
  const subcategoryKey = categories[category] && categories[category].map((cat) => ({ label: cat, value: cat }));

  const handleClick = () => {
    setStep((prev) => (prev += 1));
    setAppState((prev) => ({ ...prev, isNext: false }));
  };
  const handleCategory = (e) => setAppState((prev) => ({ ...prev, category: e.value }));
  const handleSubCategory = (e) => setAppState((prev) => ({ ...prev, subcategory: e.value, isNext: true }));

  return (
    <MainContainer>
      <SiteContainer>
        <Container>
          <Select
            className="select-category"
            defaultValue={{ label: category || "Select Category", value: category }}
            options={categoryKey}
            onChange={handleCategory}
          />
          <Select
            className="select-category"
            defaultValue={{ label: subcategory || "Select Subcategory", value: subcategory }}
            placeholder="Select SubCategory"
            options={subcategoryKey}
            onChange={handleSubCategory}
          />
        </Container>

        {isNext && (
          <ButtonContainer>
            <NextButton onClick={handleClick}>Next</NextButton>
          </ButtonContainer>
        )}
      </SiteContainer>
    </MainContainer>
  );
};

export default Category;
