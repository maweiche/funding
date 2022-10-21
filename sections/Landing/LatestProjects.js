import styled from 'styled-components'

import ProjectCard from '../../components/cards/ProjectCard'
import SectionTitle from '../../components/typography/SectionTitle'
import Title from '../../components/typography/Title'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 5%;
    gap: 2%;
`

const TitleRow = styled.div`
    text-align: center;
    margin-top: 3%;
`

// @param "my" indicates whether component visualized in context of MyProjects or Landing page
const LatestProjects = ({ data, my }) => {
    return <>
        {my ? <SectionTitle title='Project history' subtitle='Looking back at your success' /> : <TitleRow><Title text='Latest Projects' /></TitleRow>}
        <Container>
            {data.map((project, index) => {
                return <ProjectCard
                    key={index}
                    title={project.title}
                    description={project.description}
                    subcategory={project.subcategory}
                    link={`/project/${project.pid}`}
                    id={project.pid}
                />
            })}
        </Container></>
}

export default LatestProjects