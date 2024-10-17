import styles from "./footer.module.css"

export const Footer = () => {
  const year = new Date().getFullYear()

  return <div className={styles.wrapper}>&copy; {year}</div>
}
