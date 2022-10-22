import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useAccount } from 'wagmi';
import { useMoralisQuery } from 'react-moralis'
import axios from "axios"
import styled from "styled-components";

import LatestProjects from "../sections/Landing/LatestProjects";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import ProjectDetail from "../sections/ProjectDetail"

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const BlankSpace = styled.div`
    margin-top: 8%;
    margin-bottom: 8%;
`

const My: NextPage = () => {
    const { address } = useAccount()
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState("Default Title")
    const [description, setDescription] = useState("Default Description")
    const [category, setCategory] = useState(null)
    const [subcategory, setSubcategory] = useState(null)
    const [projects, setProjects] = useState([])
   

    // TBD smart contract connection
    // TBD "no project found message"
    const [microActive, setMicroActive] = useState("N/A")
    const [amPledged, setAmPledged] = useState("N/A")
    const [amBackers, setAmBackers] = useState("N/A")
    const [amMicro, setAmMicro] = useState("N/A")
    const [amDays, setAmDays] = useState("N/A")
    const [amGoal, setAmGoal] = useState("N/A")
    const [projectId, setProjectId] = useState()
    const [objectId, setObjectId] = useState()

    // Query only user's active project (state 1)
    // By design we only allow one active project per user
    const { data } = useMoralisQuery("Project", (query) =>
        query
            .equalTo("owner", address)
            .equalTo("state", 1))

    const fetchDetail = JSON.parse(
        JSON.stringify(data, [
            "title",
            "description",
            "category",
            "subcategory",
            "pid",
            "objectId"
        ]), { autoFetch: true },
    );

    const getData = async () => {
        try {
            await setTitle(fetchDetail[0].title)
            await setDescription(fetchDetail[0].description)
            await setCategory(fetchDetail[0].category)
            await setSubcategory(fetchDetail[0].subcategory)
            await setProjectId(fetchDetail[0].pid)
            await setObjectId(fetchDetail[0].objectId)
        } catch (error) {
            console.log(error)
        }
    }

    const getProjects = async () => {
        const config = {
            headers: {
                "X-Parse-Application-Id": `${process.env.NEXT_PUBLIC_DAPP_ID}`
            }
        }
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DAPP}/classes/Project?where={"owner":"${address}"}`, config)
            setProjects(res.data.results)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getData()
        getProjects()
    }, [!fetchDetail[0]])

    return <Container><Header />
        {address ? <div>
            <ProjectDetail objectId={objectId} pid={projectId} description={description} title={title} category={category} subcategory={subcategory} amBackers={amBackers} amPledged={amPledged} amDays={amDays} amGoal={amGoal} image={image} microActive={microActive} my />
            <BlankSpace />
            <LatestProjects data={projects} my />
        </div> :
            <div>No wallet found, please disconnect/connect to reinitialize</div>}
        <Footer />
    </Container>
}

export default My