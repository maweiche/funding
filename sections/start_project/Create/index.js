import { useEffect } from "react";
import { useApp } from "../../utils/appContext";

import Button from "../../../components/buttons/Button";
import SectionTitle from "../../../components/typography/SectionTitle";
import { ButtonRow } from "../SetRewards/StyleWrapper";
import { MainContainer } from "../Category/StyleWrapper";
import { RulesContainer, RulesTitle, WarningBox, Li, Row, ImageBox } from "./StyleWrapper";
import FaqCard from "../../../components/cards/FaqCard";
import { BookIcon } from "../../../components/icons/Common";

const texts = {
    title: 'Rules to follow to be eligible of Eyeseek funding',
    p1: "Owner has to inform regularly backers with project updates",
    p2: "Projects must create something to share with others",
    p3: "Projects and backer statistics must be honest and clearly presented",
    p4: "Projects can't involve prohibited items",
}

const Create = ({ setStep }) => {
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
            <SectionTitle title='Create project' subtitle='Meet crowdfunding rules' />
            <RulesContainer>
                <i>Rough scope to create a project</i>
                <RulesTitle>Conditions and rules</RulesTitle>
                <WarningBox>
                    <Li>If any of your goals are not met in 30 days of crowdfunding period, collected resources will be returned back to the backers. No fees will be collected by Eyeseek.</Li>
                    <Li>If your project is sucessfully funded, Eyeseek will collect 1% fee from the funding total.2</Li>
                    <Row>
                        <ImageBox><BookIcon width={150}/></ImageBox>
                        <FaqCard answer={texts.title} point1={texts.p1} point2={texts.p2} point3={texts.p3} point4={texts.p4} />
                    </Row>
                </WarningBox>

                <ButtonRow>
                    <NextButton onClick={handleBack}>Back</NextButton>
                    <NextButton onClick={handleClick}>Create project</NextButton> 
                </ButtonRow>
            </RulesContainer>
        </MainContainer>
    );
};

export default Create;
