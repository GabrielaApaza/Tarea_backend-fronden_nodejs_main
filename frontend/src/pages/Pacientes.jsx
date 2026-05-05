import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Pacientes.css";

const API_URL = "http://localhost:7000/api";

function Pacientes() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const { usuario, token, logout } = useAuth();
  const navigate = useNavigate();

  const formularioCompleto = nombre.trim() && edad.trim() && especialidad.trim();

  // Cargar pacientes del backend
  useEffect(() => {
    cargarPacientes();
  }, []);

  const cargarPacientes = async () => {
    try {
      setCargando(true);
      const response = await axios.get(`${API_URL}/pacientes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPacientes(response.data);
      setError("");
    } catch (err) {
      setError("Error al cargar pacientes");
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const guardarPaciente = async () => {
    if (!formularioCompleto) return;

    try {
      if (editandoId) {
        // Actualizar
        await axios.put(`${API_URL}/pacientes/${editandoId}`, {
          nombre,
          edad: parseInt(edad),
          especialidad,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Crear
        await axios.post(`${API_URL}/pacientes`, {
          nombre,
          edad: parseInt(edad),
          especialidad,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setNombre("");
      setEdad("");
      setEspecialidad("");
      setEditandoId(null);
      cargarPacientes();
    } catch (err) {
      setError(err.response?.data?.error || "Error al guardar paciente");
    }
  };

  const eliminarPaciente = async (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este paciente?")) {
      try {
        await axios.delete(`${API_URL}/pacientes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        cargarPacientes();
      } catch (err) {
        setError("Error al eliminar paciente");
      }
    }
  };

  const editarPaciente = (paciente) => {
    setNombre(paciente.nombre);
    setEdad(paciente.edad);
    setEspecialidad(paciente.especialidad);
    setEditandoId(paciente.id);
  };

  const manejarLogout = () => {
    logout();
    navigate("/login");
  };

  if (cargando) return <div className="contenedor"><p>Cargando...</p></div>;

  return (
    <div className="contenedor">
      {!formularioCompleto && (
        <div className="toast">Falta llenar espacios para completar registro</div>
      )}

      <div className="header">
        <div>
          <h1>Sistema de Pacientes</h1>
          <p>Bienvenido, {usuario?.nombre}</p>
        </div>
        <button className="btn-logout" onClick={manejarLogout}>Cerrar Sesión</button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <div className={`formulario ${editandoId ? "editing" : ""}`}>
        <h2>Registrar Paciente</h2>

        <input
          type="text"
          placeholder="Nombre del Paciente"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />

        <input
          type="text"
          placeholder="Especialidad"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
        />

        <button
          className="btn-guardar"
          onClick={guardarPaciente}
          disabled={!formularioCompleto}
        >
          {editandoId ? "Actualizar Paciente" : "Guardar Paciente"}
        </button>
      </div>

      <div className="lista">
        <h2>Listar Pacientes</h2>

        {pacientes.length === 0 ? (
          <p>No hay pacientes registrados.</p>
        ) : (
          pacientes.map((p) => (
            <div key={p.id} className="card">
              <p><strong>Nombre:</strong> {p.nombre}</p>
              <p><strong>Edad:</strong> {p.edad}</p>
              <p><strong>Especialidad:</strong> {p.especialidad}</p>

              <div className="acciones">
                <button className="btn-editar" onClick={() => editarPaciente(p)}>
                  Editar
                </button>
                <button className="btn-eliminar" onClick={() => eliminarPaciente(p.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Pacientes;
