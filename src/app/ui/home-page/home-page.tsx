import { Listbox, ListboxItem } from "@nextui-org/react"
import useSWRImmutable from "swr/immutable"
import styles from "./home-page.module.css"
import { IData } from "./home-page.types"

export const HomePage = () => {
  const { data } = useSWRImmutable<IData>("people")

  return (
    <div className={styles.grid}>
      {data && (
        <Listbox>
          {data?.results.map(({ id, name }, index) => (
            <ListboxItem
              key={id}
              href={`hero/${id}`}
              classNames={{ title: "text-lg" }}
            >
              {index + 1}. {name}
            </ListboxItem>
          ))}
        </Listbox>
      )}
    </div>
  )
}
