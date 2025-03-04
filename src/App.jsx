import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Formulario from "./pages/form";
import Container from "./components/layouts/container";
import Registros from "./pages/admin/registros";
import "./App.css";
import Auth from "./pages/auth";
import ProtectedRoute from "./midelware/ProtectedRoute";
import Dashboar from "./pages/admin/dashboar";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const Seccion = JSON.parse(sessionStorage.getItem("user")) || {};
  let nombre = Seccion.name;
  let usuario = Seccion.user;
  let sede = Seccion.sede;

  console.log(Seccion.sede);

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Analytics />
              <Container nombre={nombre}>
                <Routes>
                  <Route path="/admin" element={<Dashboar />} />
                  <Route
                    path="/admin/reg"
                    element={<Registros sede={sede} />}
                  />{" "}
                  <Route
                    path="/admin/reg/detalle/:id"
                    element={"DETALLE DE LA SOLICITUD..."}
                  />
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
