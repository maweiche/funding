import { useState } from "react";
import { useRouter } from "next/router"
import type { NextPage } from "next";
import Image from "next/image";
import polygon from "../../public/icons/donate/polygon.png";
import icon2 from "../../public/icons/donate/icon2.png";
import icon3 from "../../public/icons/donate/icon3.png";
import icon4 from "../../public/icons/donate/icon4.png";
import usdt from "../../public/icons/donate/usdt.png";
import Button from "../../components/buttons/Button";
import styled from "styled-components";
import { useFormik } from "formik";
import {DonateSchema} from '../../util/validator'
import { usePrepareContractWrite, useContractWrite, useAccount } from "wagmi";
import donation from "../../abi/donation.json";
import SectionTitle from "../../components/typography/SectionTitle";
import ApproveButton from "../../components/buttons/ApproveButton";
import { Row } from '../../components/format/Row'
import { InfoIcon, SuccessIcon } from "../../components/icons/Common";
import Tooltip from "../../components/Tooltip";
import CalcOutcome from '../../components/functional/CalcOutcome'
import BalanceComponent from '../../components/functional/BalanceComponent'

const Container = styled.div`
  margin-top: 8%;
`

const DonateOption = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-left: 8%;
  @media (max-width: 500px) {
    margin-left: 3rem;
  }
  @media (max-width: 500px) {
    margin-left: 1rem;
  }
`;

const DonateContentWrapper = styled.div`
  padding-top: 5%;
  padding-left: 18%;
  padding-right: 18%;
  @media (max-width: 750px) {
    padding: 0 5%;
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
  width: 33%;
  font-family: "Roboto";

  @media (max-width: 769px) {
    width: 35%;
  }
  @media (max-width: 500px) {
    width: 40%;
  }
`;

const FormWrapper = styled.div`
  background: linear-gradient(132.28deg, rgba(47, 47, 47, 0.3) -21.57%, rgba(0, 0, 0, 0.261) 100%);
  border: 1px solid #3C3C3C;
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
  padding: 2%;
  font-family: "Montserrat";
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
  font-weight: 300;
  font-size: 1em;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5%;
  font-family: "Roboto";
  font-size: 0.9em;
  width: 100%;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const DonateButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 3%;
  gap: 1rem;
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

const Checkbox = styled.input`
  display: inline-block;
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  transition: all 150ms;
  padding: 1px;
`

const DonateOptionSub = styled.div`
  font-family: "Roboto";
  font-size: 0.7em;
  font-weight: 300;
  font-style: italic;
`
const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
const Icon = styled.svg`
  fill: none;
  stroke: #027600;
  stroke-width: 3px;
`;

const Error = styled.div`
  top: -22px;
  color: red;
  position: absolute;
  font-size: 0.8rem;
`;

const InfoBox = styled.div`
  &:hover{
    cursor: pointer;
  }
`

const Donate: NextPage = () => {
  const [currency, setCurrency] = useState("USDC");
  const [token, setToken] = useState(process.env.NEXT_PUBLIC_AD_TOKEN)
  const [blockchain, setBlockchain] = useState("polygon")
  const [explorer, setExplorer] = useState('https://mumbai.polygonscan.com/tx/')
  const [amountM, setAmountM] = useState(0);
  const [amountD, setAmountD] = useState(0)
  const [checkedReward, setCheckedReward] = useState(true);
  const [checkedFirstReward, setCheckedFirstReward] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [tooltip, setTooltip] = useState(false)
  const {address } = useAccount();

  const router = useRouter()
  const { pid } = router.query 


  // TBD check allowance and balance before 
  // 1. Check allowance
  // 2. Balance of Eye token = Minimálně zobrazit

  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
    contractInterface: donation.abi,
    functionName: 'contribute',
    // TBD Project ID hardcoded until new smart contract is deployed
    args: [amountM, amountD, pid],
  });

  console.log(pid)

  const { write, isSuccess, data } = useContractWrite(config);

  const formik = useFormik({
    initialValues: {
      directDonation: "",
      microfund: "",
    },
    validationSchema: DonateSchema,
    onSubmit: (values) => {
      setAmountM(values.microfund);
      setAmountD(values.directDonation);
      write?.();
    },
  });

  const handleSubmit = async() => {
    await write?.()
    if (blockchain === 'polygon'){
      setExplorer('https://mumbai.polygonscan.com/tx/')
    } else if (blockchain === 'bsc'){
      setExplorer('https://bscscan.com/tx/')
    } 
  }

  const handleChangeD = (e) => {
    setAmountD(e.target.value)
  }

  const handleChangeM = (e) => {
    setAmountM(e.target.value)
  }

  return <Container>
    <SectionTitle title="Select your reward" subtitle={'Select an option below'} />
    <DonateContentWrapper>
      <DonateOption>
        {tooltip && <Tooltip text='No matter from which chain you pay. Axelar will take care to route funds on target'/>}
        <DonateOptionTitle>
            <Row>Blockchain <InfoBox onMouseEnter={()=>{setTooltip(true)}} onMouseLeave={()=>{setTooltip(false)}}> <InfoIcon width={15}/></InfoBox>
            </Row><DonateOptionSub>Select your source of donation</DonateOptionSub>
        </DonateOptionTitle>
        <OptionItemWrapper>
          <div>
            <Image src={polygon} alt="polygon" width={'40%'} height={'40%'}  />
          </div>
          <div>
            <Image src={icon2} alt="fantom" width={'40%'} height={'40%'} />
          </div>
          <div>
            <Image src={icon3} alt="bnb" width={'40%'} height={'40%'}  />
          </div>
        </OptionItemWrapper>
      </DonateOption>
      <DonateOption>
        <DonateOptionTitle>
          <Row>Currency</Row><DonateOptionSub>Currently only USDC supported</DonateOptionSub>
        </DonateOptionTitle>

        <OptionItemWrapper>
          <div>
            <Image src={icon4} alt="usdc" width={'40%'} height={'40%'} />
          </div>
          <BalanceComponent address={address} token={token} amount={amountM+amountD}/>
        </OptionItemWrapper>
      </DonateOption>
      <DonateOption>
        <DonateOptionTitle>
          <Row>Donate</Row><DonateOptionSub>Without promised reward</DonateOptionSub>
        </DonateOptionTitle>
        <OptionItemWrapper>
              <Checkbox type="checkbox" checked={checkedReward} onChange={() => setCheckedReward(!checkedReward)}/>
        </OptionItemWrapper>
      </DonateOption>

      {!checkedReward && <DonateOption>
        <DonateOptionTitle>
          <Row>Donate with reward #1</Row><DonateOptionSub>Tbd description</DonateOptionSub>
        </DonateOptionTitle>
        <OptionItemWrapper>
              <Checkbox type="checkbox" checked={checkedFirstReward}  onChange={() => setCheckedFirstReward(!checkedFirstReward)}/>
        </OptionItemWrapper>
      </DonateOption>}
      {checkedReward && <div>
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
                value={amountD}
                onChange={handleChangeD}
                onBlur={formik.handleBlur}
              />
              {formik.errors.directDonation && formik.touched.directDonation && (
                <Error className="error">{formik.errors.directDonation}</Error>
              )}
              <InputAmount>{currency}</InputAmount>
            </InputInnerWrapper>
          </InputWrapper>
          <CalcOutcome amountD={amountD}/>
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
                value={amountM}
                onChange={handleChangeM}
                onBlur={formik.handleBlur}
              />
              {formik.errors.microfund && formik.touched.microfund && <Error className="error">{formik.errors.microfund}</Error>}
              <InputAmount>{currency}</InputAmount>
            </InputInnerWrapper>
          </InputWrapper>
        </FormWrapper>
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
        <DonateButtonWrapper>
          <div><ApproveButton amount={amountD + amountM} /></div>
          <div><Button disabled={!write} onClick={() => handleSubmit?.()} text='Donate' width={'200px'} /> </div>
        </DonateButtonWrapper>
        {isSuccess && <div><SuccessIcon width={20}/>
                {explorer}{JSON.stringify(data)}
         </div>}
      </div>}
    </DonateContentWrapper>
  </Container>
}

export default Donate;