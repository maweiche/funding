import styled from 'styled-components'

const Box = styled.div`
    font-size: 4em;
    font-family: 'Gemunu Libre', sans-serif;
    font-style: normal;
    letter-spacing: 1px;
    margin-bottom: 5%;
    color: #B0F6FF;
    @media (max-width: 1168px) {
        font-size: 1.7em;
    }
`

const Title = ({text}) => {
    return <Box>{text}</Box>
}

export default Title;