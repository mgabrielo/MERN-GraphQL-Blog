import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const { isLoggedin } = useSelector((state: any) => state.auth);

  return isLoggedin === true ? <Outlet /> : <Navigate to={"/auth"} />;
}
