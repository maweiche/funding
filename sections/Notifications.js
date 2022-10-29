import styled from 'styled-components'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useAccount } from "wagmi"
import Preferences from './Preferences'


const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    right: 4%;
    z-index: 1;
    top: 15%;
    transition: all 0.7s ease-in-out;
    height: 300px;
    width: 300px;
    padding: 2%;
    background: linear-gradient(155.74deg, #1C1C1C 0%, #000000 120.65%);
    border-radius: 10px;
    border: 1px solid #4E4E4E;
`

const NotiItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid #585858;
`

const Col = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 3%;
    font-size: 0.8em;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
`

const Title= styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 1.1em;
    line-height: 140%;
    color: #FFFFFF;
`

const Desc = styled.div`
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 400;
    font-size: 0.9em;
    color: #FFFFFF;
`

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 400;
    font-size: 0.9em;
    color: #B0F6FF;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`

const Notifications = () => {
    const [profile, setProfile] = useState(false)
    const [notis, setNotis] = useState([])
    const {address} = useAccount()

    const getData = async () => {
        const config = {
          headers: {
            "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
          },
        };
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Notification?where={"user":"${address}"}`, config);
            setNotis(res.data.results);
        } catch (error) {
          console.log(error);
        }
      };
      
    useEffect(() => {
        getData()
    },[])

    // Go through all notifications and mark them as read - via PUT api
    // Scroll
    // Display Max 10

    return <Container>  
       {!profile ?<> 
        {notis.map((noti) => <NotiItem>            
            <Row>            
                <div>Icon</div>
                <Col><Title>{noti.title}</Title><Desc>{noti.description}</Desc></Col>
            </Row>
            <div>Tag</div></NotiItem>)}
        </> : <Preferences/>}
      {!profile ? <Buttons onClick={()=>{setProfile(true)}}>Edit preferences</Buttons> : <Buttons onClick={()=>{setProfile(false)}}>Notifications</Buttons>}
    </Container>
}

export default Notifications