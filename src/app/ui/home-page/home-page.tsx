import { Link } from "react-router-dom"
import useSWRImmutable from "swr/immutable"
import styles from "./home-page.module.css"
import { IData } from "./home-page.types"

export const HomePage = () => {
  const { data } = useSWRImmutable<IData>("people/")

  return (
    <div className={styles.wrapper}>
      {data?.results.map(({ id, name }, index) => (
        <Link to={`hero/${id}`} key={id}>
          <div className={styles.item}>
            {index + 1}. {name}
          </div>
        </Link>
      ))}
    </div>
  )
}
