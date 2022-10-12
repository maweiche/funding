import React from 'react'
import styled from 'styled-components'

const Container = styled.button`
    border: 1px solid rgba(255,255,255,0.3);
    padding: 15px;
    padding-left: 10%;
    padding-right: 10%;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 35px;

    color: #B0F6FF;
    margin-top: 2%;

    background: rgba(107, 255, 255, 0.05);
    border: 1px solid #FFFFFF;
    border-radius: 15px;
    &:hover{
        cursor: pointer;
        opacity: 0.8;
    }
    @media (max-width: 768px) {
        margin: 0;
    }
`

const LButton = ({text}) => {
    return <Container >{text}</Container>
}

export default LButton 

