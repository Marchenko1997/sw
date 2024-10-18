import React from "react"
import { createHashRouter } from "react-router-dom"
import { Layout } from "../../widgets/layout"
import { HeroPage } from "../ui/hero-page"
import { HomePage } from "../ui/home-page"

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "hero/:id",
        element: <HeroPage />,
      },
    ],
  },
])
