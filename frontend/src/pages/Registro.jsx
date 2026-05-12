import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const API_URL = "http://localhost:7000/api";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const passwordsCoinciden = password && confirmar && password === confirmar;
  const formularioCompleto = nombre.trim() && email.trim() && password.trim() && passwordsCoinciden;

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (!passwordsCoinciden) { setError("Las contraseñas no coinciden"); return; }
    setError("");
    setCargando(true);
    try {
      const response = await axios.post(`${API_URL}/auth/registro`, { nombre, email, password });
      login(response.data.token, response.data.usuario);
      navigate("/pacientes");
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrarse");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-logo">
          <div className="auth-logo-circle">
            <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <h1>Crear Cuenta</h1>
          <p className="auth-subtitle">Completa los datos para registrarte</p>
        </div>

        {error && <p className="error">{error}</p>}

        <form onSubmit={manejarSubmit}>
          <div className="input-group">
            <input type="text" placeholder="Nombre completo" value={nombre}
              onChange={(e) => setNombre(e.target.value)} required />
            {nombre.trim() && <span className="check">✓</span>}
          </div>
          <div className="input-group">
            <input type="email" placeholder="Correo electrónico" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
            {email.trim() && <span className="check">✓</span>}
          </div>
          <div className="input-group">
            <input type="password" placeholder="Contraseña" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
            {password.trim() && <span className="check">✓</span>}
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              className={confirmar && !passwordsCoinciden ? "input-error" : ""}
              required
            />
            {passwordsCoinciden && <span className="check">✓</span>}
            {confirmar && !passwordsCoinciden && <span className="check-error">✗</span>}
          </div>
          <button type="submit" disabled={cargando || !formularioCompleto}>
            {cargando ? "Registrando..." : "Crear Cuenta"}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registro;
