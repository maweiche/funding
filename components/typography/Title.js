import styled from 'styled-components'

const Box = styled.div`
    font-size: 4em;
    font-family: 'Chenla';
    font-style: normal;
    font-weight: 400;
    letter-spacing: 1px;
    color: #B0F6FF;
    @media (max-width: 1168px) {
        font-size: 1.7em;
    }
`

const Title = ({text}) => {
    return <Box>{text}</Box>
}

export default Title;