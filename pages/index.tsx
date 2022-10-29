import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import Eye7 from "../public/Eye7.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../sections/Footer";
import Features from "../sections/Landing/Features";
import LatestProjects from "../sections/Landing/LatestProjects";
import Categories from '../sections/Landing/Categories';
import Eye1 from '../public/Eye1.png'
import { LandingSvg } from "../sections/Landing/LandingMain";
import { useApp } from "../sections/utils/appContext";

const ImageBox = styled.div`
    position: absolute;
    right: 0;
    z-index: -1;
    @media (min-width: 1768px) {
      top: 200px;
    }
`

const Container = styled.div`
  position: relative;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
`;

const EyeSevenBox = styled.div`
  margin: 5%;
  text-align: center;
  position: relative;
`;

const Home: NextPage = () => {
  const [projects, setProjects] = useState([]);
  const { appState } = useApp();
  const { filterCat } = { ...appState };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getProjects();
  }, []);

  const getProjects = async () => {
    const config = {
      headers: {
        "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`,
      },
    };
    try {
      if (filterCat === "All") {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project`, config);
        setProjects(res.data.results);
      }
      else {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project?where={"category":"${filterCat}"}`, config);
        setProjects(res.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Head>
        <title>Eyeseek Funding</title>
        <meta name="title" content="Blockchain crowdfunding application powered by Moralis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingSvg width={'100%'} height='auto'/>
      {/* <ImageBox><Image src={Eye1} alt='Eye1' width={'1000px'} /></ImageBox> */}
      <Features />
      <Categories />
      <LatestProjects data={projects} my={false} />
      <EyeSevenBox>
      <Image src={Eye7} alt="Eye7" width={"400%"} height={"40%"} />
      </EyeSevenBox>



      <Footer />
      {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-TKH8YE4L07"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TKH8YE4L07');
        `}
      </Script> */}
    </Container>
  );
};

export default Home;
