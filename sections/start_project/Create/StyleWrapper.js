import styled from "styled-components"

export const RulesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: left;
  flex-direction: column;
  text-align: left;
  padding-left: 17%;
  padding-right: 17%;
  margin-top: 7%;
`

export const RulesTitle = styled.p`
    font-size: 1.1em;
    font-weight: bold;
    font-family: "Roboto";
    margin-bottom: 5%;
    letter-spacing: 0.2px;
`

export const WarningBox = styled.div`
    background: rgba(9, 0, 0, 0.3);
    border: 1px solid #500000;
    border-radius: 5px;
    padding: 4%;
    color: #FFFFFF;
`

export const Li = styled.li`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 00;
    font-size: 0.8em;
    line-height: 2em; 
    letter-spacing: 0.01em;
    color: #FFFFFF;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 8%;
    padding-bottom: 4%;
    gap: 10%;
    border-bottom: 1px solid #262626;
    @media (max-width: 868px) {
        flex-wrap: wrap;
    }
`

export const ImageBox = styled.div`
    display: flex;
    padding-left: 1%;
`

export const Ok = styled.div`
    color: #00f600;
    text-align: left;
`

export const Err = styled.div`
    color: red;
    text-align: left;
`

export const Summary = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    background: black;
    font-family: 'Roboto';
    padding: 5%;
    font-size: 1em;
`

export const TxStatus = styled.div`
    position: relative;
    background: black;
    border-radius: 5px;
    padding: 5%;
    font-family: 'Courier New';
    font-size: 0.8em;
`

export const AnimBox = styled.div`
    position: absolute;
    right: 10%;
    top: 0;
    opacity: 0.7;
`

export const LogRow = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 5px;
`

export const Ref = styled.div`
    color: #B0F6FF;
    margin-left: 5px;
    text-decoration: underline;
    &:hover{
        cursor: pointer;
    }
`

export const InfoTag = styled.div`
    background: #0d0d0d;
    padding: 2px;
    border-radius: 5px;
    margin-right: 3%;
`