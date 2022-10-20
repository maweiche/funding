import styled from 'styled-components'

import ProjectCard from '../../components/cards/ProjectCard'
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

const LatestProjects = ({data}) => {
    return <>    
    <TitleRow><Title text='Latest Projects' /></TitleRow>
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