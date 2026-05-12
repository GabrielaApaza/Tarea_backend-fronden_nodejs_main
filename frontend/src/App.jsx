import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { AppProvider, useAppContext } from "./context/AppContext";
import { ToastProvider } from "./components/ui/Toast";
import { Sidebar } from "./components/ui/Sidebar";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Pacientes from "./pages/Pacientes";
import "./components/ui/ui.css";

function RutaProtegida({ children }) {
  const { token, cargando } = useAuth();
  if (cargando) return <div style={{ textAlign: "center", padding: "50px" }}>Cargando...</div>;
  return token ? children : <Navigate to="/login" />;
}

function LayoutProtegido({ children }) {
  const { counts } = useAppContext();
  return (
    <div className="app-layout">
      <Sidebar counts={counts} />
      <main className="app-main">{children}</main>
    </div>
  );
}

function App() {
  const { token } = useAuth();

  return (
    <AppProvider>
      <ToastProvider>
        <Routes>
          <Route path="/login"    element={token ? <Navigate to="/pacientes" /> : <Login />} />
          <Route path="/registro" element={token ? <Navigate to="/pacientes" /> : <Registro />} />
          <Route
            path="/pacientes"
            element={
              <RutaProtegida>
                <LayoutProtegido>
                  <Pacientes />
                </LayoutProtegido>
              </RutaProtegida>
            }
          />
          <Route path="/" element={<Navigate to={token ? "/pacientes" : "/login"} />} />
        </Routes>
      </ToastProvider>
    </AppProvider>
  );
}

export default App;
