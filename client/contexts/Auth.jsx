import { createContext, useState } from "react"
import api from "../src/api/Api"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  async function Login() {
    const response = await api.post("/login", {
      email: "rafael.silva@tacchini.com.br",
      password: "Rafael@100"
    })
    console.log(response.data.accessToken)
    setUser(response.data.user);
    // api.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
  }
  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;