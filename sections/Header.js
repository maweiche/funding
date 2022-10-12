import {useState} from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Logo from '../public/Logo.png'
import Link from 'next/link'

const Container = styled.div`
    padding-left: 4%;
   // background: linear-gradient(180deg, rgba(22, 0, 0, 0.3) 50%, rgba(22, 0, 0, 0) 100%);
`

const NavItem = styled.div`
    display: flex;
    font-size: 1.6em;
    font-family: 'Gemunu Libre', sans-serif;
    font-style: normal;
    align-items: center;
    letter-spacing: 1px;
   @media (max-width: 768px) {
     font-size: 1em;
     flex-wrap: wrap;
    }
`

const HeadBox = styled.div`
    display: flex;
    flex-direction: row;
    background: transparent;
    padding: 2%;
    color: #B0F6FF;
    @media (max-width: 768px) {
    
        justify-content: center;
   }
`

const ImageBox = styled.div`
    display: block;
    @media (max-width: 768px) {
    
     font-size: 0.8em;
     flex-wrap: wrap;
     padding-right: 10%;
     right: 0;
    }
    &:hover{
        cursor: pointer;
    }
`

const MenuBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5%;
    width: 100%;
    padding-left: 15%;
    @media (max-width: 768px) {
     padding: 0;
     flex-wrap: wrap;
     display: none;
    }
`

const A = styled.div`
    &:hover{
     opacity: 0.8;
     cursor: pointer;
   }
`

const AB = styled(A)`
    font-weight: bold;
`



const Header = () => {
    const [active, setActive] = useState("Home")

    return <><Container>
        <HeadBox>
        <ImageBox>  <NavItem onClick={()=>{setActive("Home")}}><Link href="/"><A><Image
            src={Logo}
            alt="Logo"
            width={'110%'}
            height={'50%'}
            /></A></Link></NavItem> </ImageBox>
         <MenuBox>
            <NavItem onClick={()=>{setActive("Explained")}}>
                {active === "Explained" ? <Link href="/explained"><AB>Example</AB></Link> : <Link href="/explained"><A>Example</A></Link>}
            </NavItem>
        </MenuBox>

        </HeadBox>
        </Container></>
}




export default Header