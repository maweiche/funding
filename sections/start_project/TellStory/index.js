import { FormStyle, InputContainer, TellContainer, Mandatory } from "./StyleWrapper";
import {useState} from 'react'
import { useApp } from "../../utils/appContext";
import { MainContainer, ButtonContainer, NextButton, DisButton } from "../Category/StyleWrapper";
import SectionTitle from "../../../components/typography/SectionTitle";
import {useMoralisFile} from 'react-moralis'
import FileUploader from '../../../helpers/FileUploader'
import Image from "next/image";

const TellStory = ({ setStep }) => {
  const { appState, setAppState } = useApp();
  const { pTitle, pDesc, pWeb, pSocial } = { ...appState };
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    moralisFile,
    saveFile,
  } = useMoralisFile();


  const story_form = [
    { title: "Title", p: pTitle,description: "Project title will help to find your project easily", text_field: false, change: (e) => setAppState((prev) => ({ ...prev, pTitle: e.target.value })) },
    { title: "Description",  p: pDesc,description: "Describe your project value in few sentences", text_field: true, change: (e) => setAppState((prev) => ({ ...prev, pDesc: e.target.value })) },
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
  // TBD iamge upload not handled correctly

  const uploadImage = () => {
    saveFile("batman.jpeg", file);
  }
  

  return (
    <MainContainer>
      <SectionTitle title="Define your story" subtitle={'Describe your project and references'} />
      <TellContainer>
        <FormStyle method="post" action="" enctype="multipart/form-data">
          <label className="custom-file-upload">
            <span className="input-span">Image Upload (TBD)</span>
                     <FileUploader
                       onFileSelect={(file) => setSelectedFile(file)}
                />
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
