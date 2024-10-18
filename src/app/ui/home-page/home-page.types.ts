import { IHero } from "../../../shared/lib/types"

export interface IData {
  count: number
  next: string
  previous: any
  results: IHero[]
}
