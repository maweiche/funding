import { useEffect } from "react";
import { useApp } from "../../utils/appContext";

import SectionTitle from "../../../components/typography/SectionTitle";
import { RewardContainer, ButtonRow } from "./StyleWrapper";
import { MainContainer, NextButton } from "../Category/StyleWrapper";
import InputContainer from "../../../components/form/InputContainer";
import Tab from "../../../components/form/Tab";
import { MainMilestoneContainer, MilestoneContainer } from "../SetGoals/StyleWrapper";



const SetRewards = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { isNext, pType } = { ...appState };
  
  /// TBD schema - Either extend Project schema or create new collection
  const dummyReward = {
    title: "Reward 1",
    description: "Reward 1 description",
    amount: 100,
    type: "Microfund",  // OR Donate OR Stream 
    tokenAmount: "address", // optional 
    tokenName: "name", // optional
    tokenAddress: "address", // optional
  }

  useEffect(() => {
  }, []);


  const handleClick = () => {
    setStep((prev) => (prev += 1));
    setAppState((prev) => ({ ...prev, isNext: false }));
  };

  const handleBack = () => {
    setStep((prev) => (prev -= 1));
  }

  /// TBD on change 

  return (<>
    <SectionTitle title='Offer rewards for backers'/>
      <MainContainer>
        <RewardContainer>
          Tier 2 scope - We will offer both ERC20 rewards AND traditional Kickstarter options
          <MainMilestoneContainer>
            <MilestoneContainer>
             {pType === 'Standard' && <Tab o1={'Microfund'} o2={'Direct donate'}/> } 
            <InputContainer 
                      label={'Amount'} 
                      placeholder={'1000'} 
                      description={'Pledged amount'}
                      type={'number'}
                    />
            <InputContainer 
                      label={'Title'} 
                      placeholder={'Godspeed'} 
                      description={'Create a unique title for your reward'}
                      type={'textArea'}
                    />
            <InputContainer 
                      label={'Description'} 
                      placeholder={'Backer receives autographed copy of the book'} 
                      description={'Describe what backer receives for this reward'}
                      type={'text'}
                    />
            2 types - Token, regular
            </MilestoneContainer>
          </MainMilestoneContainer>
        <ButtonRow>
              <NextButton onClick={handleBack}>Back</NextButton>
              <NextButton onClick={handleClick}>Next</NextButton> 
        </ButtonRow>
      </RewardContainer>
      </MainContainer>
    </>
  );
};

export default SetRewards;
