import { Pagination } from "@nextui-org/react"
import { useEffect } from "react"
import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom"
import useSWRImmutable from "swr/immutable"
import styles from "./home-page.module.css"
import { IData } from "./home-page.types"

export const HomePage = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const { data } = useSWRImmutable<IData>(`people/?page=${page}`)
  const navigate = useNavigate()

  const count = Number(data?.count) || 1
  const total = Math.max(Math.floor(count / 10), page)

  return (
    <div className={styles.wrapper}>
      {data?.results.map(({ id, name }, index) => (
        <Link to={`hero/${id}`} key={id}>
          <div className={styles.item}>
            {index + 1}. {name}
          </div>
        </Link>
      ))}
      {data && (
        <Pagination
          total={total}
          initialPage={page}
          onChange={(page) => {
            navigate(`/?page=${page}`)
          }}
        />
      )}
    </div>
  )
}
