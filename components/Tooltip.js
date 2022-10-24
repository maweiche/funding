import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: -30px;
  background: black;
  border-radius: 5px;
  padding: 5px;
  font-size: 0.8em;
  font-family: 'Neucha';
  border: 1px solid #2F2F2F;
`

const Tooltip = ({text}) => {
    return <Container>
        {text}
    </Container>
}

export default Tooltip