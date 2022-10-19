import { ElementType, useState } from "react"
import Stepper from "../components/form/Stepper"
import Category from "../sections/start_project/Category"

interface ItemProps {
  step: Number
}

const RenderItem = (props: ItemProps): JSX.Element | null => {
  switch (props.step) {
    case 0:
      return <Category />
  }

  return null
}

const StartProject = () => {
  const steps = ["Categorize", "Tell story", "Set goals", "Offer rewards", "Create project"]
  const [step, setStep] = useState<Number>(0)

  const handleStepper = (e: Number) => {
    setStep(e)
  }

  return (
    <div>
      <Stepper handleStep={handleStepper} steps={steps} step={step} />

      <RenderItem step={step} />
    </div>
  )
}

export default StartProject
