import { useApp } from "../../utils/appContext";
import { TellContainer, InputContainer } from "../TellStory/StyleWrapper";
import { ImageContainer, MilestoneContainer, MilestoneTitle, MainMilestoneContainer, MilestoneHeader, CancelButton } from "./StyleWrapper";
import { ButtonContainer, MainContainer, NextButton } from "../Category/StyleWrapper";
import ImageSelect from "../../../components/ImageSelect";

const RenderBlockchain = () => {
  const { appState, setAppState } = useApp();
  const { blockchains } = appState;

  const handleClick = (bc) => {
    const data = blockchains.map((x) => {
      x.active = x.title == bc.title;

      return x;
    });
    setAppState((prev) => ({ ...prev, blockchains: data }));
  };

  return (
    <ImageContainer>
      <label>Blockchain: </label>
      {blockchains.map((bc, index) => {
        const { title, logo, chainId, active } = bc;

        return <ImageSelect logo={logo} key={index} active={active} onClick={() => handleClick(bc)} />;
      })}
    </ImageContainer>
  );
};

const RenderCurrency = () => {
  const { appState, setAppState } = useApp();
  const { currency } = appState;

  const handleClick = (bc) => {
    const data = currency.map((x) => {
      x.active = x.title == bc.title;

      return x;
    });
    setAppState((prev) => ({ ...prev, currency: data }));
  };

  return (
    <ImageContainer>
      <label>Currency: </label>
      {currency.map((bc, index) => {
        const { title, logo, chainId, active } = bc;

        return <ImageSelect logo={logo} key={index} active={active} onClick={() => handleClick(bc)} />;
      })}
    </ImageContainer>
  );
};

const RenderMilestones = () => {
  const { appState, setAppState } = useApp();
  const { milestones } = appState;

  const handleAddMilestone = () => {
    const temp = {
      amount: 0,
      description: "",
    };
    setAppState((prev) => ({ ...prev, milestones: [...prev.milestones, temp] }));
  };

  if (milestones.length === 0) {
    return <NextButton onClick={handleAddMilestone}>Add a milestone</NextButton>;
  }

  const handleRemoveMilestone = (index) => {
    const temp = milestones.filter((_, index2) => index2 !== index);

    setAppState((prev) => ({ ...prev, milestones: temp }));
  };

  return milestones.map((ms, index) => {
    const { amount, description } = ms;

    return (
      <MainMilestoneContainer key={index}>
        <MilestoneHeader>
          <MilestoneTitle>Milestone {index + 1}</MilestoneTitle>
          <CancelButton onClick={() => handleRemoveMilestone(index)}>X</CancelButton>
        </MilestoneHeader>

        <MilestoneContainer>
          <InputContainer>
            <label className="input_label">Amount</label>

            <div className="input_container">
              <input className="input_style" type="text" placeholder="Enter your USDC amount" />
              <p className="input_description">Set amount to reach the milestone</p>
            </div>
          </InputContainer>

          <InputContainer>
            <label className="input_label">Short description</label>

            <div className="input_container">
              <textarea
                className="input_style"
                type="text"
                placeholder="Describe how exactly are you going to use resources for this milestone"
              />
              <p className="input_description">Describe how exactly are you going to use resources for this milestone</p>
            </div>
          </InputContainer>

          {milestones.length < 5 && index + 1 == milestones.length && <NextButton onClick={handleAddMilestone}>Add a milestone</NextButton>}
        </MilestoneContainer>
      </MainMilestoneContainer>
    );
  });
};

const SetGoals = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { category, subcategory, isNext } = { ...appState };

  const handleClick = () => {
    setStep((prev) => (prev += 1));
    setAppState((prev) => ({ ...prev, isNext: false }));
  };

  return (
    <MainContainer>
      <TellContainer>
        <RenderBlockchain />
        <RenderCurrency />
        <RenderMilestones />
        {!isNext && (
          <ButtonContainer>
            <NextButton onClick={handleClick}>Next</NextButton>
          </ButtonContainer>
        )}
      </TellContainer>
    </MainContainer>
  );
};

export default SetGoals;
