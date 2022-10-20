import styled from 'styled-components'

const Card = styled.div`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid #3C3C3C;
    border-radius: 15px;
    padding-left: 2em;
    padding-right: 1em;
    width: 40%;
    max-width: 800px;
    padding-top: 2em;
    margin: 2em;
    &:hover{
        opacity: 0.9;
        cursor: pointer;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`

const Title = styled.div`
    margin-top: 1em;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 1.6em;
`

const Description = styled.div`
     margin-top: 2em;
     margin-bottom: 2em;
     font-family: 'Roboto';
     font-style: normal;
     font-weight: 400;
     font-size: 1.1em;
     color: #FFFFFF;
`

const IconBox = styled.div`

`

const FeatureCard = ({ title, description, icon, onClick }) => {
    return  <Card onClick={onClick}>
        <IconBox>{icon} </IconBox>
        <Title>{title}</Title>
        <Description>{description}</Description>
    </Card>
}

export default FeatureCard