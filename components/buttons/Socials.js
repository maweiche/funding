import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinIcon,
    LinkedinShareButton,
    RedditShareButton,
    RedditIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
  } from "react-share";
  import styled from 'styled-components'
  import { useRouter } from 'next/router';
  
  
  const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-left: 2%;
  `;
  
  
  
  const Socials = () => {
    const router = useRouter();
    const url = `https://www.eyeseek.com${router.asPath}`;
    const title = 'Check out this project on EyeSeek!';
    const hashtags_facebook = "#EyeSeek, #Moralis, #Google";
    const hashtags_twitter = ['EyeSeek', 'Moralis', 'Google'];
    
    return (
        <Row>
            <FacebookShareButton url={url} quote={title} hashtag={hashtags_facebook}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title} hashtags={hashtags_twitter}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={url} >
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <RedditShareButton url={url} title={title}>
                <RedditIcon size={32} round />
            </RedditShareButton>
            <TelegramShareButton url={url} title={title}>
                <TelegramIcon size={32} round />
            </TelegramShareButton>
            <WhatsappShareButton url={url} title={title}>
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
        </Row>
    )
  }
  
  export default Socials;