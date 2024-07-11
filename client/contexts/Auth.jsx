import { createContext, useState } from "react"
import api from "../src/api/Api"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  async function Login(data) {
    const response = await api.post("/login", data);

    if(response.data == "Conta não encontrada, favor realizar cadastro!") {
      return "Não autorizado"
    }
    
    if(response.data == "Senha incorreta") {
      return "Senha incorreta"
    }

    setUser(response.data.user);
  }
  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;