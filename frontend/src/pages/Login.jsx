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

  const formularioCompleto = email.trim() && password.trim();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      login(response.data.token, response.data.usuario);
      navigate("/pacientes");
    } catch (err) {
      setError(err.response?.data?.error || "Credenciales incorrectas");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-logo">
          <div className="auth-logo-circle">
            <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 8v4l3 3"/></svg>
          </div>
          <h1>Bienvenido</h1>
          <p className="auth-subtitle">Inicia sesión para continuar</p>
        </div>

        {error && <p className="error">{error}</p>}

        <form onSubmit={manejarSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {email.trim() && <span className="check">✓</span>}
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {password.trim() && <span className="check">✓</span>}
          </div>
          <button type="submit" disabled={cargando || !formularioCompleto}>
            {cargando ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="auth-footer">
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
