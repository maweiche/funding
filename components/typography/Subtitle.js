import styled from "styled-components"

const Box = styled.div`
  font-size: 2.1em;
  font-family: "Roboto";
  font-style: normal;
  letter-spacing: 1px;
  font-weight: 300;
  @media (max-width: 1168px) {
    font-size: 1.5em;
  }
`

const Subtitle = ({ text }) => {
  return <Box>{text}</Box>
}

export default Subtitle
