import { FormStyle, InputContainer, TellContainer, Mandatory } from "./StyleWrapper";
import { useApp } from "../../utils/appContext";
import { MainContainer, ButtonContainer, NextButton, DisButton } from "../Category/StyleWrapper";
import SectionTitle from "../../../components/typography/SectionTitle";

const TellStory = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { pTitle, pDesc, pWeb, pSocial } = { ...appState };


  const story_form = [
    { title: "Project Title", p: pTitle,description: "Project title will help to find your project easily", text_field: false, change: (e) => setAppState((prev) => ({ ...prev, pTitle: e.target.value })) },
    { title: "Short Description",  p: pDesc,description: "Give people a reason on why they should invest in your project", text_field: true, change: (e) => setAppState((prev) => ({ ...prev, pDesc: e.target.value })) },
    { title: "Website",  p: pWeb,description: "Provide website with your project detail", text_field: false, change: (e) => setAppState((prev) => ({ ...prev, pWeb: e.target.value })) },
    { title: "Socials", p: pSocial, description: "Link to your primary socials. (Twitter, Instagram, Facebook, etc.)", text_field: false, change: (e) => setAppState((prev) => ({ ...prev, pSocial: e.target.value })) },
  ];


  const handleClick = () => {
    setStep((prev) => (prev += 1));
  };

  const handleBack = () => {
    setStep((prev) => (prev -= 1));
  }

  // TBD all fields mandatory
  // Prefill value with context data 
  // TBD validate HTTPS links
  // TBD validate - Cannot be ""


  return (
    <MainContainer>
      <SectionTitle title="Define your story" subtitle={'TBD some description'} />
      <TellContainer>
        <FormStyle method="post" action="" enctype="multipart/form-data">
          <label className="custom-file-upload">
            <input className="input-file" type="file" name="files[]" id="file" />
            <span className="input-span">Image Upload (descoped in MVP)</span>
          </label>
          {story_form.map((sf) => {
            const { title, description, text_field, change, p } = sf;
            return (
              <InputContainer>
                <label className="input_label">{title}</label>
                <div className="input_container">
                  {text_field ? (
                    <textarea className="input_style" placeholder={p} onChange={change}/>
                  ) : (
                    <input className="input_style" type="text" placeholder={p} onChange={change} />
                  )}
                  <p className="input_description">{description}</p>
                </div>
              </InputContainer>
            );
          })}
        </FormStyle>
        {pSocial === "" && <Mandatory>All fields all mandatory</Mandatory>}
        <ButtonContainer>
          <NextButton onClick={handleBack}>Back</NextButton>
         {pDesc !== "" ? <NextButton onClick={handleClick}>Next</NextButton> : <DisButton>Next</DisButton>}
        </ButtonContainer>
      </TellContainer>
    </MainContainer>
  );
};

export default TellStory;
