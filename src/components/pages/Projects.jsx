import Message  from "../layout/Message"
import { useLocation } from "react-router-dom/dist"
import styles from "./Projects.module.css"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import { useEffect, useState } from "react"
import ProjectCard from "../project/ProjectCard"


function Projects() {

  const [projects, setProjects] = useState([])

  const location = useLocation()

  let message = ''

  if (location.state) {
    message = location.state.message
  }

  useEffect(() => {
    fetch("http://localhost:5000/projects",{
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }).then(resp => resp.json())
    .then(data => {
      setProjects(data)
    }).catch(err => console.log(err))
  }, [])

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then(resp => resp.json())
    .then(data => {
      setProjects(projects.filter((project) => project.id !== id))
    }).catch(err => console.log(err))
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Projects</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message type=".success" msg={message}/>}
      <Container customClass="start">
        {projects.length > 0 &&
        projects.map((project) => (
          <ProjectCard 
          name={project.name ? project.name : 'Projeto sem nome'}
          id={project.id}
          budget={project.budget ? project.budget : 0}
          category={project.category ? project.category.name : 'Nenhum'}
          key={project.id}
          handleRemove={removeProject} />
        ))
        }
      </Container>
    </div>
  )
}

export default Projects