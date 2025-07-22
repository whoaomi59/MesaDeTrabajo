import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Formulario from "./pages/form";
import Container from "./components/layouts/container";
import Registros from "./pages/admin/registros";
import "./App.css";
import Auth from "./pages/auth";
import ProtectedRoute from "./midelware/ProtectedRoute";
import Dashboar from "./pages/admin/dashboar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import QR from "./pages/admin/codigoqr";

function App() {
  const Seccion = JSON.parse(sessionStorage.getItem("user")) || {};
  let nombre = Seccion.name;
  let usuario = Seccion.user;
  let sede = Seccion.sede;

  return (
    <Router>
      <Analytics />
      <SpeedInsights />
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Container nombre={nombre}>
                <Routes>
                  <Route path="/admin" element={<Dashboar />} />
                  <Route
                    path="/admin/reg"
                    element={<Registros sede={sede} usuario={nombre} />}
                  />{" "}
                  <Route
                    path="/admin/reg/detalle/:id"
                    element={"DETALLE DE LA SOLICITUD..."}
                  />
                  <Route path="/QR" element={<QR />} />
                </Routes>
              </Container>
            </ProtectedRoute>
          }
        />
        <Route>
          <Route path="/" element={<Formulario />} />
          <Route path="/Auth" element={<Auth />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
