import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const API_URL = "http://localhost:7000/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      login(response.data.token, response.data.usuario);
      navigate("/pacientes");
    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Iniciar Sesión</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={manejarSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={cargando}>
            {cargando ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
        <p>
          ¿No tienes cuenta?{" "}
          <a href="/registro" onClick={(e) => { e.preventDefault(); navigate("/registro"); }}>
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
