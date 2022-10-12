import styled from "styled-components";
import { CheckMark } from "../icons/MobileSet";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 2%;
    margin-bottom: 2%;
`

const Circle = styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
    width: 40px;
    height: 40px;
    background: #000535;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 50%;
`

const NotCircle = styled(Circle)`
    background: #3A3A3A;
    &:hover{
        cursor: pointer;
        opacity: 0.8;
    }
`

const YesCircle = styled(Circle)`
    background: #008D39;
    &:hover{
        cursor: pointer;
        opacity: 0.8;
    }
`

const Line = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    height: 1px;
    width: 50px;
    margin-left: 10px;
    margin-right: 10px;
    background: #C8C8C8;
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`


const Stepper = ({increment, decrement,steps, step}) => {

    const Step = ({s}) => {
        return <>
            {s < step && <YesCircle onClick={decrement}><CheckMark width={15}/></YesCircle>}
            {s === step && <Circle/>}
            {s > step && <NotCircle onClick={increment}/>}
        </>
    }

    return <Container>
            <Step s={1}/>
            <Line/><Step s={2}/>
            <Line/><Step s={3}/>
        {steps >= 4 && <>
            <Line/><Step s={4}/>
            {steps >= 5 && <><Line/><Step s={5}/></>}
        </>}
            

    </Container>
}

export default Stepper;