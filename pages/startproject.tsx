import { useState } from "react"
import Stepper from "../components/form/Stepper"

const StartProject = () => {
  const steps = ["Categorize", "Tell story", "Set goals", "Offer rewards", "Create project"]
  const [step, setStep] = useState<Number>(1)

  const handleStepper = (e: Number) => {
    setStep(e)
  }

  return (
    <div>
      <Stepper handleStep={handleStepper} steps={steps} step={step} />
    </div>
  )
}

export default StartProject
