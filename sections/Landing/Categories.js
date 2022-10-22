import styled from 'styled-components'
import {useContext, useState} from 'react'
import { AppContext } from '../utils/appContext'
import {cats} from '../../data/cats'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 5%;
    gap: 4%;
    justify-content: center;
`
const Cat = styled.div`
    font-size: 1em;
    font-family: 'Montserrat';
    &:hover{
        cursor: pointer;
        opacity: 0.9;
    }
`

const ACat = styled(Cat)`
    color: white;
`

const Categories = () => {
    const {category, setCategory} = useState('Technology')
    const handleCat = (cat) => {
        console.log(cat)
        //Set context with selected category
    }
    return <Container>
            {cats.map((cat) =>
             <div>{cat === category ? <Cat onClick={handleCat(cat)}>{cat}</Cat> : <ACat  onClick={()=>{handleCat(cat)}}>{cat}</ACat>}</div>
        )}
        </Container>
}

export default Categories