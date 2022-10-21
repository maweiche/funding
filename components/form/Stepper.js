import styled from "styled-components"

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
  border: 1px solid #ffffff;
  box-sizing: border-box;
  border-radius: 50%;
`

const NotCircle = styled(Circle)`
  background: #3a3a3a;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

const YesCircle = styled(Circle)`
  background: #b0f6ff;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

const Line = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  height: 1px;
  width: 50px;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  background: #c8c8c8;
  animation: fadeIn 0.5s;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const StepContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
`

const Stepper = ({ handleStep, steps, step }) => {
  const Step = ({ s }) => {
    return (
      <>
        {s < step && <YesCircle onClick={() => handleStep(s)}></YesCircle>}
        {s === step && <Circle />}
        {s > step && <NotCircle onClick={() => handleStep(s)} />}
      </>
    )
  }

  return (
    <Container>
      {steps.map((st, index) => {
        if (index + 1 == steps.length) {
          return (
            <StepContent key={index}>
              <Step s={index} />
              <p>{st}</p>
            </StepContent>
          )
        }

        return (
          <StepContainer key={index}>
            <StepContent>
              <Step s={index} />
              <p>{st}</p>
            </StepContent>

            <Line />
          </StepContainer>
        )
      })}
    </Container>
  )
}

export default Stepper
