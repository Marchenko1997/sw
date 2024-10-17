import { useParams } from "react-router-dom"

export const HeroPage = () => {
  const { id } = useParams()
  return <div>HeroPage</div>
}
