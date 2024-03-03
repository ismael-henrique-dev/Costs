
import styles from "./Home.module.css"
import imagem from "../imgs/porquinho-home.webp"
import LinkButton from "../layout/LinkButton"
function Home() {
  return (
    <section className={styles.home_container}>
      <h1>Bem vindo ao <span>Costs</span></h1>
      <p>Comece a gerenciar seus projetos agora mesmo!</p>
      <LinkButton to="/newproject" text="Criar Projeto" />
      <img src={imagem} alt="Costs" />
    </section>
  )
}

export default Home