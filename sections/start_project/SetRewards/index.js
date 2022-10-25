import { useEffect } from "react";
import { useApp } from "../../utils/appContext";

import SectionTitle from "../../../components/typography/SectionTitle";
import { RewardContainer, ButtonRow } from "./StyleWrapper";
import { MainContainer, NextButton } from "../Category/StyleWrapper";

const SetRewards = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { isNext } = { ...appState };

  useEffect(() => {
  }, []);


  const handleClick = () => {
    setStep((prev) => (prev += 1));
    setAppState((prev) => ({ ...prev, isNext: false }));
  };

  const handleBack = () => {
    setStep((prev) => (prev -= 1));
  }


  return (
    <MainContainer>
     <SectionTitle title='Offer rewards for backers'/>
     <RewardContainer>
   Tier 2 scope - We will offer both ERC20 rewards AND traditional Kickstarter options
    
    <ButtonRow>
          <NextButton onClick={handleBack}>Back</NextButton>
          <NextButton onClick={handleClick}>Next</NextButton> 
    </ButtonRow>
   </RewardContainer>
    </MainContainer>

  );
};

export default SetRewards;
