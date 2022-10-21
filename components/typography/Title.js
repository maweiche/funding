import styled from "styled-components"

const Box = styled.div`
  font-size: 3.7em;
  font-family: "Chenla";
  font-style: normal;
  font-weight: 400;
  letter-spacing: 1px;
  color: #b0f6ff;
  @media (max-width: 1168px) {
    font-size: 1.7em;
  }
`

const Title = ({ text }) => {
  return <Box>{text}</Box>
}

export default Title
