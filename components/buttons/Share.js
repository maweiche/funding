import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon
  } from "react-share";
import styled from "styled-components";

const ShareBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 2%;
`

// TBD URLs

const Share = ({fbQuote,twTitle,twVia,liTitle,liSum,liSource}) => {
    return <ShareBox>
        <FacebookShareButton quote={fbQuote} hashtag='seek-funding'><FacebookIcon size={25} round={true}/></FacebookShareButton>
        <LinkedinShareButton title={liTitle} summary={liSum} source={liSource}><LinkedinIcon size={25} round={true}/></LinkedinShareButton>
        <TwitterShareButton title={twTitle} via={twVia} hashtags={['eyeseek','crowdfunding']}><TwitterIcon size={25} round={true}/></TwitterShareButton>

      </ShareBox>
  }

export default Share;
