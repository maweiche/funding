import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  background: black;
  border-radius: 5px;
  padding: 5px;
  padding-left: 20%;
  padding-right: 20%;
  top: -40px;
  font-size: 0.9em;
  border: 1px solid #2F2F2F;
`

const Tooltip = ({text}) => {
    return <Container>
        {text}
    </Container>
}

export default Tooltip