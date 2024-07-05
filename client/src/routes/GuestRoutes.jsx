import { Route, Routes } from "react-router-dom"
import Guest from "../components/Guest"

export default function GuestRoutes() {
  return (
    <Routes>
      <Route exact path="/" Component={Guest} />
    </Routes>
  )
}