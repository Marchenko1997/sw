import { devtools } from "zustand/middleware"
import { create } from "zustand/react"
import { IStarship } from "../lib/types"

interface IStarshipsState {
  starships: {
    [key: string]: IStarship
  }
  fetchStarships: (id: number) => Promise<IStarship>
}

export const useStarshipsStore = create<IStarshipsState>()(
  devtools((set, getState) => ({
    starships: {},
    fetchStarships: async (id: number) => {
      const starship = await fetch(
        `${process.env.REACT_APP_API_URL}/starships/${id}/`,
      ).then((res) => res.json())
      set({ starships: { ...getState().starships, [starship.id]: starship } })
      return starship
    },
  })),
)
