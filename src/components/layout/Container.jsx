/* eslint-disable react/prop-types */
import styles from "./Container.module.css"

function Container(props) {
  return (
    <div className={`${styles.container} ${styles[props.customClass]}`}> {/*Quando eu quiser adicionar mais de uma classe, tenho que fazer isso */}
      {props.children} {/*Encapsular o Routes dentro de Container OBS: se não fizer isso, ele não funcionaR*/ }
      {/* Sempre quando for encapsular algo dentro algum componente pelas tags - <Container>Conteudo que será encapsulado</Conatainer> tem que passar props.children*/}

    </div>
  )
}

export default Container