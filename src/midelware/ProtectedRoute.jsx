import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const Seccion = JSON.parse(sessionStorage.getItem("user"));

  // 🔥 Si no hay usuario, redirige al login
  if (!Seccion) {
    return <Navigate to="/Auth" replace />;
  }

  return children;
}
