import { useState } from "react";
import Stepper from "../components/form/Stepper";
import Header from "../sections/Header";
import Category from "../sections/start_project/Category";
import TellStory from "../sections/start_project/TellStory";

interface ItemProps {
  step: Number;
}

const StartProject = () => {
  const steps = ["Categorize", "Tell story", "Set goals", "Offer rewards", "Create project"];
  const [step, setStep] = useState<Number>(0);

  const handleStepper = (e: Number) => {
    setStep(e);
  };

  const RenderItem = (props: ItemProps): JSX.Element | null => {
    switch (props.step) {
      case 0:
        return <Category setStep={setStep} />;

      case 1:
        return <TellStory setStep={setStep} />;
    }

    return null;
  };

  return (
    <>
      <Header/>
      <Stepper handleStep={handleStepper} steps={steps} step={step} />

      <RenderItem step={step} />
    </>
  );
};

export default StartProject;
