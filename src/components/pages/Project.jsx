import styles from "./Project.module.css"
import Container from '../layout/Container'
import ProjectForm from "../project/ProjectForm"
import ServiceForm from "../service/serviceForm"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { parse, v4 as uuidv4 } from "uuid"
import ServiceCard from "../service/ServiceCard"


function Project() {

  const { id } = useParams()
  
  const [projects, setProjects] = useState([])
  const [services, setServices] = useState([])
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
      setServices(data.service)
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
    setShowServiceForm(!showServiceForm)

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

  function removeService(id, cost) {

    const servicesUpdated = projects.service.filter((service) => service.id !== id)

    const projectUpdated = projects

    projectUpdated.service = servicesUpdated

    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
      }, body : JSON.stringify(projectUpdated),
    }).then(res => res.json())
    .then((data) => {
      setProjects(projectUpdated)
      setServices(servicesUpdated)
    }).catch(err => console.log(err))

  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  console.log(projects.category ? projects.category.name : 'No category')

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
                <span>Categoria: </span> {projects.category ? projects.category.name : 'Projeto sem categoria'}
              </p>
              <p>
                <span>Orçamento: </span> R$ {projects.budget ? projects.budget : 0}
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
            {services.length > 0 && 
              services.map((service) => (
                <ServiceCard 
                  id={service.id}
                  name={service.name}
                  cost={service.cost}
                  description={service.description}
                  key={service.id}
                  handleRemove={removeService}
                />
              ))
            }
            {services.length === 0 && <p>Não há serviços</p>}
          </Container>
        </div>
      </Container>
    </div>
  )
}

export default Project