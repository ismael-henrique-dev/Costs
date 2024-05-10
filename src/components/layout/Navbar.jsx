import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"
import { RiMenu3Fill } from "react-icons/ri"
import logo from "../imgs/costs_logo.png"
import { useState } from "react"

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link className={styles.logo} to="/">
          <img src={logo} alt="logo" />
        </Link>
        <RiMenu3Fill
          className={styles.menuHamburguer}
          onClick={handleMenuClick}
        />
        <ul className={`${styles.list} ${menuOpen ? styles.showMenu : ""}`}>
          <li className={styles.item}><Link to="/">Home</Link></li>
          <li className={styles.item}><Link to="/newproject">Novo Projeto</Link></li>
          <li className={styles.item}><Link to="/projects">Projetos</Link></li>
          <li className={styles.item}><Link to="/company">Empresa</Link></li>
          <li className={styles.item}><Link to="/contact">Contato</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar