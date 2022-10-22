import styled from 'styled-components'

import ProjectCard from '../../components/cards/ProjectCard'
import SectionTitle from '../../components/typography/SectionTitle'

const Container = styled.div`
    margin-top: 5%;
`

const ProjectBox = styled.div`
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
    return <Container>
        {my ? <SectionTitle title='Project history' subtitle='Looking back at your success' /> : <SectionTitle title='Recently added' subtitle={'Support latest projects'} />}
        <ProjectBox>
            {data.map((project, index) => {
                return <ProjectCard
                    key={index}
                    title={project.title}
                    description={project.description}
                    category={project.category}
                    subcategory={project.subcategory}
                    link={`/project/${project.pid}`}
                    id={project.pid}
                />
            })}
        </ProjectBox></Container>
}

export default LatestProjects