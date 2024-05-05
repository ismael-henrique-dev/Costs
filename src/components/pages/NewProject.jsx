// import {useHistory} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import ProjectForm from "../project/ProjectForm"
import styles from "./NewProject.module.css"

function NewProject() {

  // const history = useHistory()

  function createPost(project) {
    //inicializando o custo e os serviços
    project.cost = 0
    project.service = []

    fetch("http://localhost:5000/projects",{
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    }).then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      //redirect
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const navigate = useNavigate();

     
      navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } })
    })
    .catch(err => console.log(err))
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar aos serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
    </div>
  )
}

export default NewProject