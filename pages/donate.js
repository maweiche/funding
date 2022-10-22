import Head from "next/head";
import ButtonHeader from "../components/buttons/ButtonHeader";
import Image from "next/image";
import Logo from "../public/Logo.png";
import polygon from "../public/icons/donate/polygon.png";
import icon2 from "../public/icons/donate/icon2.png";
import icon3 from "../public/icons/donate/icon3.png";
import icon4 from "../public/icons/donate/icon4.png";
import usdt from "../public/icons/donate/usdt.png";
import styled from "styled-components";
import { useFormik } from "formik";
import { DonateSchema } from "../util/validator";

const DonateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  @media (max-width: 500px) {
    padding: 10px;
  }
`;
const DonateTitle = styled.h1`
  font-family: "Chenla";
  font-style: normal;
  font-weight: 400;
  font-size: 60px;
  color: #b0f6ff;
  border-bottom: 1px solid #b0f6ff;
  padding: 0 10%;
  @media (max-width: 769px) {
    font-size: 40px;
  }
  @media (max-width: 500px) {
    font-size: 30px;
    padding: 0 5%;
  }
`;

const DonateOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-left: 5rem;
  @media (max-width: 500px) {
    margin-left: 3rem;
  }
  @media (max-width: 500px) {
    margin-left: 1rem;
  }
`;
const DonateContentWrapper = styled.div`
  padding: 0 10%;
  @media (max-width: 500px) {
    padding: 0 5%;
  }
`;

const DonateSubtitle = styled.h2`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  line-height: 35px;
  letter-spacing: 0.01em;
  margin-bottom: 4rem;
  @media (max-width: 769px) {
    font-size: 20px;
  }
  @media (max-width: 500px) {
    font-size: 15px;
  }
`;

const OptionItemWrapper = styled.div`
  margin-left: 12%;
  display: flex;
  align-items: center;

  & > div {
    margin-right: 1rem;
  }
  @media (max-width: 500px) {
    & > div {
      width: 35px;
    }
  }
  @media (max-width: 500px) {
    margin-left: 10px;
  }
`;
const DonateOptionTitle = styled.div`
  width: 20%;

  @media (max-width: 769px) {
    width: 35%;
  }
  @media (max-width: 500px) {
    width: 40%;
  }
`;

const FormWrapper = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #2f2f2f;
  border-radius: 5px;
  padding: 10px 20px;
  padding: 2rem 5rem 1rem 5rem;
  @media (max-width: 769px) {
    padding: 2rem 1rem 1rem 3rem;
  }
  @media (max-width: 500px) {
    padding: 2rem 1rem 1rem 1rem;
  }
`;
const Input = styled.input`
  background: rgba(107, 255, 255, 0.05);
  border: 1px solid #ffffff;
  border-radius: 10px;
  padding: 1rem;
  width: 100%;
  margin-bottom: 10px;

  // hiding input spinner on "input[type=number]" for Chrome, Safari, Edge, Opera
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  // hiding input spinner on "input[type=number]" for Firefox
  -moz-appearance: textfield;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const LabelWrapper = styled.div`
  width: 25%;

  @media (max-width: 769px) {
    width: 45%;
  }
  @media (max-width: 500px) {
    margin-bottom: 1rem;
    width: 100%;
  }
`;

const DonateList = styled.li`
  margin-left: 30px;
  margin-top: 10px;
`;

const InputInnerWrapper = styled.div`
  width: 80%;
  position: relative;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const InputAmount = styled.div`
  position: absolute;
  right: 4%;
  top: 30%;
`;

const FormInfo = styled.div`
  width: 80%;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Button = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px 5%;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 1em;
  line-height: 35px;
  color: #b0f6ff;
  margin: 3rem 0;
  background: rgba(107, 255, 255, 0.05);
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    margin: 2.5rem 0;
    padding: 10px 10%;
  }
`;

const DonateButtonWrapper = styled.div`
  text-align: end;
`;
const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  transition: all 150ms;
  padding: 1px;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
`;
const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
const Icon = styled.svg`
  fill: none;
  stroke: #027600;
  stroke-width: 3px;
`;

const Error = styled.span`
  color: red;
`;

const Donate = () => {
  const formik = useFormik({
    initialValues: {
      directDonation: "",
      microfund: "",
    },
    validationSchema: DonateSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log(formik.errors);

  return (
    <div>
      <Head>
        <title>Eyeseek Donate</title>
        <meta name="title" content="Blockchain crowdfunding application powered by Moralis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DonateHeader>
        <Image src={Logo} alt="logo" width={"110%"} height={"50%"} />
        <div>
          <ButtonHeader />
        </div>
      </DonateHeader>
      <DonateTitle>Select your reward</DonateTitle>

      <DonateContentWrapper>
        <DonateSubtitle>Select an option below</DonateSubtitle>
        <DonateOption>
          <DonateOptionTitle>
            <h4>Blockchain</h4>
          </DonateOptionTitle>

          <OptionItemWrapper>
            <div>
              <Image src={polygon} alt="polygon" />
            </div>
            <div>
              <Image src={icon2} alt="icon2" />
            </div>
            <div>
              <Image src={icon3} alt="icon3" />
            </div>
          </OptionItemWrapper>
        </DonateOption>
        <DonateOption>
          <DonateOptionTitle>
            <h4>Currency</h4>
          </DonateOptionTitle>

          <OptionItemWrapper>
            <div>
              <Image src={icon4} alt="icon4" />
            </div>
            <div>
              <Image src={usdt} alt="usdt" />
            </div>
          </OptionItemWrapper>
        </DonateOption>
        <DonateOption>
          <DonateOptionTitle>
            <h4>Donate without reward</h4>
          </DonateOptionTitle>

          <OptionItemWrapper>
            <CheckboxContainer>
              <HiddenCheckbox type="checkbox" defaultChecked={true} />
              <StyledCheckbox>
                <Icon viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </Icon>
              </StyledCheckbox>
            </CheckboxContainer>
          </OptionItemWrapper>
        </DonateOption>
        <div>
          <form>
            <FormWrapper>
              <InputWrapper>
                <LabelWrapper>
                  <label htmlFor="directDonation">Direct donation</label>
                </LabelWrapper>

                <InputInnerWrapper>
                  <Input
                    id="directDonation"
                    name="directDonation"
                    type="number"
                    placeholder="1000"
                    value={formik.values.directDonation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.directDonation && formik.touched.directDonation && (
                    <Error className="error">{formik.errors.directDonation}</Error>
                  )}
                  <InputAmount>USDC</InputAmount>
                </InputInnerWrapper>
              </InputWrapper>
              <InputWrapper>
                <LabelWrapper>
                  <label htmlFor="microfund">Create own microfund</label>
                </LabelWrapper>
                <InputInnerWrapper>
                  <Input
                    id="microfund"
                    name="microfund"
                    type="number"
                    placeholder="1000"
                    value={formik.values.microfund}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.microfund && formik.touched.microfund && <Error className="error">{formik.errors.microfund}</Error>}
                  <InputAmount>USDC</InputAmount>
                </InputInnerWrapper>
              </InputWrapper>

              <InputWrapper>
                <LabelWrapper>
                  <label></label>
                </LabelWrapper>
                <FormInfo>
                  <p>
                    Microfund donation will NOT add funds to the project directly. It will create incentivization for other users with
                    simple rules:
                  </p>
                  <ul>
                    <DonateList>
                      Anytime someone donates, the same amount is charged from all active microfunds until it is depleted
                    </DonateList>
                    <DonateList>
                      If microfund is not fully depleted upon end of the crowdfunding, rest of resources are returned back to microfunds
                      owners after achieving project goals
                    </DonateList>
                  </ul>
                </FormInfo>
              </InputWrapper>
            </FormWrapper>
            <DonateButtonWrapper>
              <Button onClick={formik.handleSubmit}>Donate</Button>
            </DonateButtonWrapper>
          </form>
        </div>
      </DonateContentWrapper>
    </div>
  );
};

export default Donate;
