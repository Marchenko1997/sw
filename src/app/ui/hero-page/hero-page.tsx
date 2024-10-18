import { CircularProgress } from "@nextui-org/react"
import {
  Controls,
  type Edge,
  MiniMap,
  type Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useSWRImmutable from "swr/immutable"
import { useFilmsStore } from "../../../shared/hooks/use-films-store"
import { useStarshipsStore } from "../../../shared/hooks/use-starships-store"
import { IHero, IStarship } from "../../../shared/lib/types"
import styles from "./hero-page.module.css"

const initialNodes: Node[] = []
const initialEdges: Edge[] = []

export const HeroPage = () => {
  const { id } = useParams()
  const { data: hero } = useSWRImmutable<IHero>(id ? `people/${id}/` : null)
  const fetchFilm = useFilmsStore((state) => state.fetchFilm)
  // cache of films
  const films = useFilmsStore((state) => state.films)
  // if true, then all the hero’s films are in the cache
  const [filmsReady, setFilmsReady] = useState(false)
  const [nodes, setNodes] = useNodesState(initialNodes)
  const [edges, setEdges] = useEdgesState(initialEdges)
  const heroFilms = useCallback(() => {
    return films.filter(({ id }) => hero?.films.includes(id))
  }, [films, hero])
  // cache of starships
  const starships = useStarshipsStore((state) => state.starships)
  const fetchStarships = useStarshipsStore((state) => state.fetchStarships)
  const [starshipsIds, setStarshipsIds] = useState<number[]>([])
  const [heroStarships, setHeroStarships] = useState<IStarship[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (hero) {
      hero.films.forEach((film) => {
        if (!films.some(({ id }) => id === film)) {
          fetchFilm(film)
        }
      })
    }
  }, [hero])

  useEffect(() => {
    if (hero && heroFilms().length === hero.films.length) {
      setFilmsReady(true)
      const starshipsIds = [
        ...new Set(heroFilms().flatMap(({ starships }) => starships)),
      ]
      ;(async () => {
        for (const id of starshipsIds) {
          let starship = starships[id]
          if (!starship) {
            starship = await fetchStarships(id)
          }
          setHeroStarships((prevState) => [...prevState, starship])
        }
      })()
      setStarshipsIds(starshipsIds)
    }
  }, [films, hero])

  useEffect(() => {
    if (
      starshipsIds.length > 0 &&
      starshipsIds.length === heroStarships.length
    ) {
      heroStarships.forEach(({ id, name }, index) => {
        // add ships nodes to graph
        setNodes((nds) =>
          nds.concat({
            id: `ship${id}`,
            data: { label: name },
            position: { x: 100, y: 200 + 100 * index },
            className: "bg-purple-100",
          }),
        )

        heroFilms().forEach(({ starships, title, id: filmId }) => {
          if (starships.includes(id)) {
            setEdges((nds) =>
              nds.concat({
                id: `film${String(filmId)}-ship${String(id)}`,
                source: `film${String(filmId)}`,
                target: `ship${String(id)}`,
              }),
            )
          }
        })

        setIsReady(true)
      })
    }
  }, [heroStarships])

  useEffect(() => {
    if (filmsReady && hero) {
      // add hero node to graph
      setNodes((nds) =>
        nds.concat({
          id: `hero${String(hero.id)}`,
          data: { label: hero.name },
          position: { x: 0, y: 0 },
          className: "bg-amber-300 font-bold text-md",
        }),
      )
      // add films nodes to graph
      setNodes((nds) =>
        nds.concat([
          ...heroFilms().map(({ id, title }, index) => ({
            id: `film${String(id)}`,
            data: { label: title },
            position: { x: index * 200, y: 100 },
            className: "bg-blue-200",
          })),
        ]),
      )
      // add connection hero to film
      setEdges((nds) =>
        nds.concat([
          ...heroFilms().map(({ id }) => ({
            id: `hero${String(hero.id)}-film${String(id)}`,
            source: `hero${String(hero.id)}`,
            target: `film${String(id)}`,
          })),
        ]),
      )
    }
  }, [filmsReady])

  return (
    <div className={styles.wrapper}>
      <p className={"text-center"}>
        <Link to="/">Return to main page</Link>
      </p>
      <div className={"h-full"}>
        {isReady ? (
          <ReactFlow nodes={nodes} edges={edges}>
            <Controls />
          </ReactFlow>
        ) : (
          <CircularProgress aria-label="Loading..." />
        )}
      </div>
    </div>
  )
}
