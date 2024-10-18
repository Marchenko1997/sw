import { create } from "zustand/react"
import { IFilm } from "../lib/types"

interface IFilmsState {
  films: IFilm[]
  fetchFilm: (id: number) => void
}

export const useFilmsStore = create<IFilmsState>()((set, getState) => ({
  films: [],
  fetchFilm: async (id: number) => {
    const film = await fetch(
      `${process.env.REACT_APP_API_URL}/films/${id}/`,
    ).then((res) => res.json())
    set({ films: [...getState().films, film] })
  },
}))
