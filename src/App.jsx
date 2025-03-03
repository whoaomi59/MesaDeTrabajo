import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Formulario from "./pages/form";
import Container from "./components/layouts/container";
import Registros from "./pages/admin/registros";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Container>
                <Routes>
                  <Route path="/admin/reg" element={<Registros />} />
                </Routes>
              </Container>
            </>
          }
        />

        <Route>
          <Route path="/" element={<Formulario />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
