import styles from "./Project.module.css"
import Container from '../layout/Container'
import ProjectForm from "../project/ProjectForm"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

function Project() {

  const { id } = useParams()
  console.log(id)

  const [projects, setProjects] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
      },
    }).then(res => res.json())
    .then((data) => {
      setProjects(data)
    }).catch(err => console.log(err))
  }, [id])

  function editPost(projects) {
    console.log(projects)

    fetch(`http://localhost:5000/projects/${projects.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
      }, body : JSON.stringify(projects)
    }).then(res => res.json())
    .then((data) => {
      setProjects(data)
      setShowProjectForm(!projects)
    }).catch(err => console.log(err))
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }
  console.log(projects.category)
  return (
    <div className={styles.project_datails}>
      <Container customClass="column">
        <div className={styles.datails_container}>
          <h1>Projeto: {projects.name}</h1>
          <button onClick={toggleProjectForm} className={styles.btn}>
            {!showProjectForm ? "Editar projeto" : "Fechar"}
          </button>
          {!showProjectForm ? (
            <div className={styles.project_info}>
              <p>
                <span>Categoria: </span> {projects.name}
              </p>
              <p>
                <span>Orçamento: </span> R$ {projects.budget}
              </p>
              <p>
                <span>Total utilizado: </span> R$ {projects.cost}
              </p>
            </div>
          ) : (
            <div className={styles.project_info}>
              <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={projects}/>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Project