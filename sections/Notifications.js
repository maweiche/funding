import styled from 'styled-components'

// Core for Notification task - TBD https://app.clickup.com/t/321nykk

const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    right: 4%;
    z-index: 1;
    top: 15%;
    transition: all 0.7s ease-in-out;
    height: 300px;
    width: 300px;
    padding: 2%;
    background: #141414;
`

const NotiRow = styled.div`
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

const Notifications = () => {
    return <Container>
       <NotiRow>
            <Row>            
                <div>Icon</div>
                <Col><Title>Title</Title><Desc>Description</Desc></Col>
            </Row>
            <div>Tag</div>
       </NotiRow>
    </Container>
}

export default Notifications