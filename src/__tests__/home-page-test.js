import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { HomePage } from "../app/ui/home-page"

test("HomePage", async () => {
  render(<HomePage />, { wrapper: BrowserRouter })
  const links = await screen.findAllByRole("link")
  expect(links[0]).toHaveAttribute(
    "href",
    expect.stringMatching(/^\/hero\/\d+$/),
  )
})
