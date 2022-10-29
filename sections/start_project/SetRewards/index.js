import { useEffect, useState } from "react";
import { useApp } from "../../utils/appContext";

import SectionTitle from "../../../components/typography/SectionTitle";
import { RewardContainer, ButtonRow, TabRow, TooltipBox, IconBox } from "./StyleWrapper";
import { MainContainer, NextButton } from "../Category/StyleWrapper";
import InputContainer from "../../../components/form/InputContainer";
import Tab from "../../../components/form/Tab";
import { MainMilestoneContainer, MilestoneContainer } from "../SetGoals/StyleWrapper";
import Tooltip from "../../../components/Tooltip";
import { InfoIcon } from "../../../components/icons/Common";
import { Row } from "../../../components/format/Row";

const SetRewards = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { isNext, pType } = { ...appState };
  const [rType, setRType] = useState('Microfund')
  const [microTooltip, setMicroTooltip] = useState(false)
  const [donationTooltip, setDonationTooltip] = useState(false)

  /// TBD schema - Either extend Project schema or create new collection
  const dummyReward = {
    title: "Reward 1",
    description: "Reward 1 description",
    amount: 100,
    type: { rType },  // OR Donate OR Stream 
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
    <SectionTitle title='Offer rewards for backers' />
    <MainContainer>
      <RewardContainer>
        Tier 2 scope - We will offer both ERC20 rewards AND traditional Kickstarter options
        <MainMilestoneContainer>
          <MilestoneContainer>
            <TabRow> {pType === 'Standard' && <Tab o1={'Microfund'} o2={'Direct donate'} onClick={()=>{setRType('Donate')}} />} 
              <TooltipBox>
                {microTooltip && <Tooltip text={'Microfund creators will get rewards for setting specific maximum cap, even though total amount does not have to be completely transferred to your project at the end. Higher number of microfunds positively impacts following donations.'} />}
                {donationTooltip && <Tooltip text={'Fixed pledge given by direct donation. Standard Kickstarter-like backing experience with no extra magic around. With reward for direct donation backer knows for certain, how much value will be spend at the end for this reward.'} />}
              </TooltipBox>
            </TabRow>
            {rType === 'Microfund' && <InputContainer
              label={'Amount'}
              placeholder={'1000'}
              description={
                <Row>Microfund cap amount
                  <IconBox onMouseEnter={() => setMicroTooltip(true)} onMouseLeave={() => setMicroTooltip(false)}>
                    <InfoIcon width={15} />
                  </IconBox>
                </Row>}
              type={'number'}
            />}
            {rType === 'Donate' && <InputContainer
              label={'Amount'}
              placeholder={'1000'}
              description={
                <Row>Backed amount
                  <IconBox onMouseEnter={() => setDonationTooltip(true)} onMouseLeave={() => setDonationTooltip(false)}>
                    <InfoIcon width={15} />
                  </IconBox>
                </Row>}
              type={'number'}
            />}

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
