import { FormStyle, InputContainer, TellContainer } from "./StyleWrapper";
import { MainContainer, ButtonContainer, NextButton } from "../Category/StyleWrapper";

const TellStory = ({ setStep }) => {
  const story_form = [
    { title: "Project Title", description: "Project title will help people to find your project easily", text_field: false },
    { title: "Short Description", description: "Gives people a reason on why they should invest in your project", text_field: true },
    { title: "Location", description: "", text_field: false },
    { title: "Website", description: "", text_field: false },
    { title: "Socials", description: "Link to your primary socials. (Twitter, Instagram, Facebook, etc.)", text_field: false },
  ];

  const handleClick = () => {
    setStep((prev) => (prev += 1));
  };

  return (
    <MainContainer>
      <TellContainer>
        <FormStyle method="post" action="" enctype="multipart/form-data">
          <label className="custom-file-upload">
            <input className="input-file" type="file" name="files[]" id="file" />
            <span className="input-span">Image Upload</span>
          </label>

          {story_form.map((sf) => {
            const { title, description, text_field } = sf;
            return (
              <InputContainer>
                <label className="input_label">{title}</label>

                <div className="input_container">
                  {text_field ? (
                    <textarea className="input_style" placeholder={title} />
                  ) : (
                    <input className="input_style" type="text" placeholder={title} />
                  )}
                  <p className="input_description">{description}</p>
                </div>
              </InputContainer>
            );
          })}
        </FormStyle>

        <ButtonContainer>
          <NextButton onClick={handleClick}>Next</NextButton>
        </ButtonContainer>
      </TellContainer>
    </MainContainer>
  );
};

export default TellStory;
