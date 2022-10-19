import React from 'react'
import styled from 'styled-components'

const MyButton = styled.button`
    border: 1px solid rgba(255,255,255,0.3);
    padding: 1.5%;
    padding-left: 10%;
    padding-right: 10%;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    line-height: 35px;
    color: #B0F6FF;
    margin-top: 2%;
    background: rgba(107, 255, 255, 0.05);
    border-radius: 5px;
    width: ${props => props.width};
    &:hover{
        cursor: pointer;
        opacity: 0.8;
    }
    @media (max-width: 768px) {
        margin: 0;
    }
`

const Button = ({text, onClick, width}) => {
    return <MyButton onClick={onClick} width={width} >{text}</MyButton>
}

export default Button 

