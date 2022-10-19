import { useRouter } from 'next/router'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import styled from 'styled-components'

import SectionTitle from '../../components/typography/SectionTitle'
import Header from '../../sections/Header'
import Tag from '../../components/typography/Tag'
import ImgSkeleton from '../../components/skeletons/ImgSkeleton'
import Button from '../../components/buttons/Button'

// TBD - UI will be reviewed and cleaned in  https://app.clickup.com/t/321qw03

const Container = styled.div`
    margin-top: 5%;
`

const DetailBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid #2F2F2F;
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
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 1em;
    line-height: 20px;
    color: #FFFFFF;

`

const LeftPart = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding-right: 5%;
    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 5%;
        margin-top: 5%;
    }
`

const RightPart = styled.div`
    border-top: 3px solid #B0F6FF;
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
    font-family: 'Chenla';
    font-style: normal;
    font-size: 1.5em;
    font-weight: 400;
    color: ${props => props.color};
` 

const RowDesc = styled.div`
    color: white;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
`

const dummy = {
    id: 1,
    title: 'Project abc',
    description: 'A 7-dice coin set; Made out of metal; for RPG, Tabletop, or just for fun!',
    image: '',
    category: 'Technology',
    subcategory: 'Gadgets',
    amountPledged: '$1,000,000',
    amountBackers: '1,050',
    amountMicro: '54',
    amountDays: '10',
    amountGoal: '$10,000,000',
    bookmarked: true,
    socFb: 'fbURL',
    socTwitter: 'twitterURL',
    socLinked: 'linkedURL',
}


// Will be moved to /components/icon
const BookmarkIcon = <svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.89916 0.539705L2.89921 0.539699C2.98186 0.527118 3.07154 0.513149 3.12739 0.504L3.13603 0.50391L3.2748 0.503193C3.39708 0.502732 3.57634 0.502315 3.80664 0.501948C4.26713 0.501213 4.93049 0.500674 5.7475 0.500352C7.38147 0.499707 9.62943 0.499929 12.097 0.501178L21.0122 0.505688L21.1987 0.549594C21.1987 0.549596 21.1987 0.549598 21.1987 0.549599C22.3655 0.824373 23.1555 1.58019 23.4398 2.64478L23.9229 2.51577L23.4398 2.64479L23.4839 2.80986L23.4919 15.8724L23.4994 28.0616L18.2787 24.5563L12.2788 20.5278L12.0001 20.3406L11.7214 20.5277L5.75448 24.5333C3.52732 26.0284 1.55214 27.3549 0.509636 28.056C0.506821 27.6599 0.504673 27.1165 0.503128 26.3913C0.498954 24.4316 0.499196 21.1506 0.50244 15.8766L0.510458 2.80986L0.554549 2.64479L0.554554 2.64477C0.736005 1.96529 1.12802 1.40816 1.69777 1.01525L1.69778 1.01524C2.01396 0.797189 2.51739 0.597785 2.89916 0.539705Z" stroke="white"/>
</svg>


const ProjectDetail = () => {
  const router = useRouter()
  const { pid } = router.query // ID to retrieve project details 

  // setDetail will be used with API result
  const [detail, setDetail] = useState(dummy) 
  const [marked, setMarked] = useState(dummy.bookmarked)

  const handleBookmark = () => {
    setMarked(!marked)
    // TBD Tier 1 - https://app.clickup.com/t/32jy4wv
  }

  const handleDonate = () => {
    // TBD https://app.clickup.com/t/327d8bc
    console.log('Donated')
  }

  useEffect(() => {
    // Will be replaced with API call https://app.clickup.com/t/321qw03
    setDetail(dummy)
  }, [])

  const Bookmark = () => {
    return <div onClick={()=>{handleBookmark()}}>{marked ? <>{BookmarkIcon}</> : <>{BookmarkIcon}</>}</div>
  }


  // TBD Tier 1 - Share via socials

  const Row = ({title, desc, icon, color}) => {
    return <RowBox>
        <RowCol><RowTitle color={color}>{title}</RowTitle> <RowDesc>{desc}</RowDesc></RowCol>
                    {icon}
            </RowBox>
  }

  return    <><Header/><Container>
        <SectionTitle title={'Project detail'} subtitle={detail.title}/>
        <DetailBox>
            <LeftPart>
                {detail.image === '' || !detail.image ? <ImgSkeleton/> :  <Image src={detail.image} alt={detail.title}  width={500} height={500}/>}
                    <Categories><Tag tag={detail.category} color={'#000850'}/><Tag tag={detail.subcategory} color={'#035201'}/></Categories>
                    <Desc>{detail.description}</Desc>
            </LeftPart>
            <RightPart>
                <Row title={detail.amountPledged} desc={`pledged of ${detail.amountGoal} goal`} color='#00FFA3' icon={<Bookmark/>}/>
                <Row title={detail.amountBackers} desc={`backers`} color='white' />
                <Row title={detail.amountMicro} desc={`microfunds active`} color='white' />
                <Row title={detail.amountDays} desc={`days to go`} color='white' />
                <Button text='Fund it!' width={'100%'} onClick={()=>{handleDonate()}}/>
            </RightPart>

        </DetailBox>
    
    </Container></>
}

export default ProjectDetail
