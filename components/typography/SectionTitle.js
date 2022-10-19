import Title from "./Title"
import Subtitle from "./Subtitle"

import styled from "styled-components"

const Container = styled.div``
const TitleRow = styled.div`
  border-bottom: 1px solid #b0f6ff;
  padding-left: 17%;
`

const SubRow = styled.div`
  padding-left: 17%;
`

const SectionTitle = ({ title, subtitle }) => {
  return (
    <Container>
      <TitleRow>
        {" "}
        <Title text={title} />
      </TitleRow>
      <SubRow>
        <Subtitle text={subtitle} />
      </SubRow>
    </Container>
  )
}

export default SectionTitle
