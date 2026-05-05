import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Pacientes from "./pages/Pacientes";

function RutaProtegida({ children }) {
  const { token, cargando } = useAuth();

  if (cargando) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Cargando...</div>;
  }

  return token ? children : <Navigate to="/login" />;
}

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/pacientes" /> : <Login />} />
      <Route path="/registro" element={token ? <Navigate to="/pacientes" /> : <Registro />} />
      <Route
        path="/pacientes"
        element={
          <RutaProtegida>
            <Pacientes />
          </RutaProtegida>
        }
      />
      <Route path="/" element={<Navigate to={token ? "/pacientes" : "/login"} />} />
    </Routes>
  );
}

export default App;