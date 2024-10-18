import {
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
  ReactFlow,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useSWRImmutable from "swr/immutable"
import { useFilmsStore } from "../../../shared/hooks/use-films-store"
import { IHero } from "../../../shared/lib/types"
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
    if (hero) {
      if (heroFilms().length === hero.films.length) {
        setFilmsReady(true)
      }
    }
  }, [films, hero])

  useEffect(() => {
    if (filmsReady && hero) {
      // add hero node to graph
      setNodes([
        {
          id: `hero${String(hero.id)}`,
          data: { label: hero.name },
          position: { x: 0, y: 0 },
        },
      ])
      const nodes: Node[] = heroFilms().map(({ id, title }, index) => ({
        id: `film${String(id)}`,
        data: { label: title },
        position: { x: index * 200, y: 100 },
      }))
      // add films nodes to graph
      setNodes((prevState) => [...prevState, ...nodes])

      const edges: Edge[] = heroFilms().map(({ id }) => ({
        id: `hero${String(hero.id)}-film${String(id)}`,
        source: `hero${String(hero.id)}`,
        target: `film${String(id)}`,
        animated: true,
      }))
      setEdges((prevState) => [...prevState, ...edges])
    }
  }, [filmsReady])

  return (
    <div className={styles.wrapper}>
      <p className={"text-center"}>
        <Link to="/">Return to main page</Link>
      </p>
      <div className={"flex-auto"}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          // fitView
        />
      </div>
    </div>
  )
}
