import { useApp } from "../../utils/appContext";
import { TellContainer } from "../TellStory/StyleWrapper";
import { Image, ImageContainer, InactiveImage } from "./StyleWrapper";
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
