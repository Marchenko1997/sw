import { NextUIProvider } from "@nextui-org/react"
import { Outlet } from "react-router-dom"
import { Footer } from "../footer"
import { Header } from "../header"
import styles from "./layout.module.css"

export const Layout = () => {
  return (
    <NextUIProvider>
      <div className={styles.wrapper}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </NextUIProvider>
  )
}
