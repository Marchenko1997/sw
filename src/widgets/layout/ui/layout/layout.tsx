import { NextUIProvider } from "@nextui-org/react"
import { Outlet } from "react-router-dom"
import { SWRConfig } from "swr"
import { Footer } from "../footer"
import { Header } from "../header"
import styles from "./layout.module.css"

export const Layout = () => {
  return (
    <NextUIProvider>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            fetch(`${process.env.REACT_APP_API_URL}/${url}`).then((res) =>
              res.json(),
            ),
        }}
      >
        <div className={styles.wrapper}>
          <Header />
          <main className={styles.main}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </SWRConfig>
    </NextUIProvider>
  )
}
