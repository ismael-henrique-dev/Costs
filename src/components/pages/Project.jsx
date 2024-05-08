import styles from "./Project.module.css"
import Container from '../layout/Container'
import ProjectForm from "../project/ProjectForm"
import ServiceForm from "../service/serviceForm"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { parse, v4 as uuidv4 } from "uuid"


function Project() {

  const { id } = useParams()
  console.log(id)

  const [projects, setProjects] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)

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

  function createService(projects) {

    const lastService = projects.service[projects.service.length - 1]
    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(projects.cost) + parseFloat(lastServiceCost)

    if (newCost > parseFloat(projects.budget)) {
      console.log("Orçamento ultrapassado, verifique o valor do serviço")
      projects.service.pop()
      return false
    }

    projects.cost = newCost

    fetch(`http://localhost:5000/projects/${projects.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
      }, body : JSON.stringify(projects)
    }).then(res => res.json())
    .then((data) => {
      console.log(data)
    }).catch(err => console.log(err))

  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
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
        <div className={styles.service_form_container}>
          <h2>Adicione um serviço: </h2>
          <button onClick={toggleServiceForm} className={styles.btn}>
            {!showServiceForm ? "Adicionar serviço" : "Fechar"}
          </button>
          <div className={styles.project_info}>
            {showServiceForm && (
             <ServiceForm handleSubmit={createService}
              btnText="Adicionar serviço" 
              projectData={projects} />
            )}
          </div>
          <h2>Serviços: </h2>
          <Container>
            <p>serviços</p>
          </Container>
        </div>
      </Container>
    </div>
  )
}

export default Project