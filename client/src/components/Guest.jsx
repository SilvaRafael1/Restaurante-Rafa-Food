import { useContext } from "react";
import AuthContext from "../../contexts/Auth";

export default function Guest() {
  const context = useContext(AuthContext)

  async function handleLogin() {
    await context.Login()
  }

  return (
    <div>
      <h1>NÃO AUTENTICADO</h1>
      <button onClick={handleLogin}>Entrar</button>
    </div>
  )
}