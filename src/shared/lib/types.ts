export interface IHero {
  id: number
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: number
  films: number[]
  species: number[]
  vehicles: number[]
  starships: number[]
  created: Date
  edited: Date
  url: string
}

export interface IFilm {
  id: number
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  characters: number[]
  planets: number[]
  starships: number[]
  vehicles: number[]
  species: number[]
  created: Date
  edited: Date
  url: string
}
