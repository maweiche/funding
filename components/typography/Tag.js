import styled from "styled-components"


const Box = styled.div`
    background: ${props => props.color};
    text-align: center;
    padding: 1%;
    background: rgba(${props => props.color}, 0.4);
    border: 1px solid #000850;
    border-radius: 45px;
    padding-left: 15px;
    padding-right: 15px;
`

const Text = styled.div`
    font-family: 'Roboto Flex';
    font-style: normal;
    font-weight: 300;
    font-size: 0.8em;
    letter-spacing: 0.3px;
    color: white;
`

const Tag = ({tag, color}) => {
    return <>
        <Box color={color}><Text>{tag}</Text></Box>
    </>
}

export default Tag