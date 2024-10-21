import styles from "./footer.module.css"

export const Footer = () => {
  const year = new Date().getFullYear()

  return <footer className={styles.wrapper}>&copy; {year}</footer>
}
