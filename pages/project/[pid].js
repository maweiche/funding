import { useRouter } from "next/router"
import Image from "next/image"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { useMoralisQuery } from 'react-moralis'

import SectionTitle from "../../components/typography/SectionTitle"
import Header from "../../sections/Header"
import Tag from "../../components/typography/Tag"
import ImgSkeleton from "../../components/skeletons/ImgSkeleton"
import Button from "../../components/buttons/Button"
import { BookmarkIcon, BookmarkFilledIcon } from '../../components/icons/common'
import Share from '../../components/buttons/Share'

// Blockchain related 
import donation from '../../abi/donation.json'
import { useContractRead } from 'wagmi'


const Container = styled.div`
  margin-top: 5%;
`

const DetailBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid #2f2f2f;
  padding: 3%;
  padding-left: 5%;
  margin-top: 5%;
  margin-left: 15%;
  margin-right: 15%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    margin: 1%;
    padding: 1%;
  }
`

const Desc = styled.div`
  margin-top: 2%;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 1em;
  line-height: 20px;
  color: #ffffff;
`

const LeftPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 5%;
    margin-top: 5%;
  }
`

const RightPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 3px solid #b0f6ff;
  width: 50%;
  margin-left: 3%;
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    margin-top: 5%;
    margin-bottom: 5%;
  }
`

const Categories = styled.div`
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 1.4%;
  padding-bottom: 0.5%;
`

const RowCol = styled.div`
  display: flex;
  flex-direction: column;
`
const RowTitle = styled.div`
  font-family: "Chenla";
  font-style: normal;
  font-size: 1.5em;
  font-weight: 400;
  color: ${(props) => props.color};
`

const RowDesc = styled.div`
  color: white;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
`

const FlexRow = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`

const Bkmrk = styled.div`
  display: flex;
  min-height: 30px;
  &:hover {
    cursor: pointer;
  }
`

const ProjectDetail = () => {
  const router = useRouter()
  const { pid } = router.query 

  const micros = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_AD_DONATOR,
    contractInterface: donation.abi,
    functionName: 'getConnectedMicroFunds',
    chainId: 80001,
    args: [pid],
    watch: false,
  })

  var microActive = ""
  
  if (micros.data){
    microActive = micros.data.toString()
  }


  const { data } = useMoralisQuery("ProjectTest", (query) => query.equalTo("pid", pid));
  const fetchDetail = JSON.parse(
    JSON.stringify(data, [
      "title",
      "description",
      "category",
      "subcategory",
    ]), [], { autoFetch: true },
  );


  const [image, setImage] = useState(null)
  const [title, setTitle] = useState("Default Title")
  const [description, setDescription] = useState("Default Description")
  const [category, setCategory] = useState(null)
  const [subcategory, setSubcategory] = useState(null)

  const [amPledged, setAmPledged] = useState("N/A")
  const [amBackers, setAmBackers] = useState("N/A")
  const [amMicro, setAmMicro] = useState("N/A")
  const [amDays, setAmDays] = useState("N/A")
  const [amGoal, setAmGoal] = useState("N/A")

  const [marked, setMarked] = useState(false)

  const handleBookmark = () => {
    setMarked(!marked)
    // TBD Tier 1 - https://app.clickup.com/t/32jy4wv
    // Push to bookmark array
    // Fix moving icon upon switch
    // Bookmarks could be handled only for authed users
  }

  const handleDonate = () => {
    // TBD https://app.clickup.com/t/327d8bc
    console.log('Donate')
  }

  const getData = async () => {
    try {
      await setTitle(fetchDetail[0].title)
      await setDescription(fetchDetail[0].description)
      await setCategory(fetchDetail[0].category)
      await setCategory(fetchDetail[0].subcategory)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [!fetchDetail[0]])

  const Bookmark = () => {
    return (
      <Bkmrk onClick={() => { handleBookmark() }}>
        {!marked ? <BookmarkIcon width={20} /> : <BookmarkFilledIcon width={20} />}
      </Bkmrk>
    )
  }

  const Row = ({ title, desc, icon, color }) => {
    return (
      <RowBox>
        <RowCol>
          <RowTitle color={color}>{title}</RowTitle> <RowDesc>{desc}</RowDesc>
        </RowCol>
        {icon}
      </RowBox>
    )
  }

  return (
    <>
      <Header />
      <Container>
        <SectionTitle title={"Project detail"} subtitle={title} />
        <DetailBox>
          <LeftPart>
            {!image ? <ImgSkeleton /> : <Image src={detail.image} alt={title} width={500} height={500} />}
            <Categories>
              {category && <Tag tag={category} color={"#000850"} />}
              {subcategory && <Tag tag={subcategory} color={"#035201"} />}
            </Categories>
            <Desc>{description}</Desc>
          </LeftPart>
          <RightPart>
            <div>
              <Row title={amPledged} desc={`pledged of ${amGoal} goal`} color="#00FFA3" icon={<Bookmark />} />
              <Row title={amBackers} desc={`backers`} color="white" />
              <Row title={microActive} desc={`microfunds active`} color="white" />
              <FlexRow>
                <Row title={amDays} desc={`days to go`} color="white" />
                <Share fbQuote='fbQuote' twTitle='twTitle' twVia='twVia' liTitle='linked title' liSum='linked summary' liSource='linked source' />
              </FlexRow>
            </div>
            <div>
              <Button
                text="Fund it!"
                width={"100%"}
                onClick={() => { handleDonate() }}
              />
            </div>
          </RightPart>
        </DetailBox>
      </Container>
    </>
  )
}

export default ProjectDetail
