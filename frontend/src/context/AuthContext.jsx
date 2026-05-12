import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (token) {
      // Aquí podrías validar el token con el backend si lo deseas
      setUsuario(JSON.parse(localStorage.getItem("usuario")));
    }
    setCargando(false);
  }, [token]);

  const login = (token, usuario) => {
    // Normalize: backend returns 'name', frontend uses 'nombre'
    const normalizado = { ...usuario, nombre: usuario.nombre || usuario.name };
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(normalizado));
    setToken(token);
    setUsuario(normalizado);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("pacientes_guardados"); // Limpiar pacientes locales al logout
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};
