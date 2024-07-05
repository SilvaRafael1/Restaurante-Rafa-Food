import { useContext } from "react";
import SignedRoutes from "./SignedRoutes";
import GuestRoutes from "./GuestRoutes";
import AuthContext from "../../contexts/Auth";

export default function IndexRoutes() {
  const { signed } = useContext(AuthContext);
  return signed ? <SignedRoutes /> : <GuestRoutes />
}