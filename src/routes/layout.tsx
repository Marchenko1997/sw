import { NextUIProvider } from "@nextui-org/react"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <NextUIProvider>
      <div>
        <Outlet />
      </div>
    </NextUIProvider>
  )
}
