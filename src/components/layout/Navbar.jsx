import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"
import Container from "./Container"
import logo from "../imgs/costs_logo.png"

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link className={styles.logo} to="/"><img src={logo} alt="logo" /></Link>
        <ul className={styles.list}>
          <li className={styles.item}><Link to="/">Home</Link></li>
          <li className={styles.item}><Link to="/newproject">Novo Projeto</Link></li>
          <li className={styles.item}><Link to="/projects">Projetos</Link></li>
          <li className={styles.item}><Link to="/company">Empresa</Link></li>
          <li className={styles.item}><Link to="/contact">Contato</Link></li>
        </ul>
      </Container>
    </nav> 
  )
}

export default Navbar