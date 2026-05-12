import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useAppContext } from "../context/AppContext";
import { useToast } from "../components/ui/Toast";
import { Modal } from "../components/ui/Modal";
import "./Pacientes.css";

const API_URL = "http://localhost:7000/api";

function Pacientes() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [modalId, setModalId] = useState(null);
  const { token } = useAuth();
  const { setCounts } = useAppContext();
  const toast = useToast();

  const formularioCompleto = nombre.trim() && edad.toString().trim() && especialidad.trim();

  const pacientesFiltrados = pacientes.filter((p) =>
    p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.especialidad?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const especialidades = new Set(pacientes.map((p) => p.especialidad).filter(Boolean));

  useEffect(() => { cargarPacientes(); }, []);

  const cargarPacientes = async () => {
    try {
      setCargando(true);
      const { data } = await axios.get(`${API_URL}/pacientes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPacientes(data);
      setCounts((prev) => ({ ...prev, pacientes: data.length }));
    } catch {
      toast("Error al cargar pacientes", "error");
    } finally {
      setCargando(false);
    }
  };

  const guardarPaciente = async () => {
    if (!formularioCompleto) return;
    try {
      const datos = { nombre, edad: parseInt(edad), especialidad };
      if (editandoId) {
        await axios.put(`${API_URL}/pacientes/${editandoId}`, datos, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast("Paciente actualizado correctamente", "success");
      } else {
        await axios.post(`${API_URL}/pacientes`, datos, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast("Paciente registrado correctamente", "success");
      }
      setNombre(""); setEdad(""); setEspecialidad(""); setEditandoId(null);
      cargarPacientes();
    } catch (err) {
      toast(err.response?.data?.error || "Error al guardar paciente", "error");
    }
  };

  const confirmarEliminar = async () => {
    try {
      await axios.delete(`${API_URL}/pacientes/${modalId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast("Paciente eliminado", "warning");
      cargarPacientes();
    } catch {
      toast("Error al eliminar paciente", "error");
    } finally {
      setModalId(null);
    }
  };

  const editarPaciente = (p) => {
    setNombre(p.nombre);
    setEdad(p.edad?.toString() || "");
    setEspecialidad(p.especialidad);
    setEditandoId(p.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelarEdicion = () => {
    setNombre(""); setEdad(""); setEspecialidad(""); setEditandoId(null);
  };

  if (cargando) return <div className="contenedor"><p>Cargando...</p></div>;

  return (
    <div className="contenedor">
      <div className="page-header">
        <h1>Gestión de Pacientes</h1>
        <p>Administra el registro y seguimiento de pacientes</p>
      </div>

      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-value">{pacientes.length}</div>
          <div className="stat-label">Total Pacientes</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{especialidades.size}</div>
          <div className="stat-label">Especialidades</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {pacientes.length > 0
              ? Math.round(pacientes.reduce((s, p) => s + (p.edad || 0), 0) / pacientes.length)
              : 0}
          </div>
          <div className="stat-label">Edad Promedio</div>
        </div>
      </div>

      <div className={`formulario ${editandoId ? "editing" : ""}`}>
        <h2>{editandoId ? "Editar Paciente" : "Registrar Nuevo Paciente"}</h2>

        <div className="fields-grid">
          <div className="field-group">
            <input type="text" placeholder="Nombre completo" value={nombre}
              onChange={(e) => setNombre(e.target.value)} />
            {nombre.trim() && <span className="field-check">✓</span>}
          </div>
          <div className="field-group">
            <input type="number" placeholder="Edad" value={edad} min="0" max="150"
              onChange={(e) => setEdad(e.target.value)} />
            {edad.toString().trim() && <span className="field-check">✓</span>}
          </div>
          <div className="field-group">
            <input type="text" placeholder="Especialidad" value={especialidad}
              onChange={(e) => setEspecialidad(e.target.value)} />
            {especialidad.trim() && <span className="field-check">✓</span>}
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-guardar" onClick={guardarPaciente} disabled={!formularioCompleto}>
            {editandoId ? "Actualizar Paciente" : "Guardar Paciente"}
          </button>
          {editandoId && (
            <button className="btn-cancelar" onClick={cancelarEdicion}>Cancelar</button>
          )}
        </div>

        {!formularioCompleto && (
          <p className="hint">
            {[
              !nombre.trim() && "Nombre requerido",
              !edad.toString().trim() && "Edad requerida",
              !especialidad.trim() && "Especialidad requerida",
            ].filter(Boolean).map((m, i) => <span key={i}>• {m}{"  "}</span>)}
          </p>
        )}
      </div>

      <div className="search-bar">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          placeholder="Buscar por nombre o especialidad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="lista-header">
        <h2>Lista de Pacientes</h2>
        <span className="lista-count">
          {busqueda ? `${pacientesFiltrados.length} de ${pacientes.length}` : pacientes.length}
        </span>
      </div>

      {pacientesFiltrados.length === 0 ? (
        <div className="lista-vacia">
          <p>{busqueda ? "No se encontraron pacientes con ese criterio." : "No hay pacientes registrados."}</p>
        </div>
      ) : (
        <div className="tabla-wrapper">
          <table className="tabla">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Especialidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientesFiltrados.map((p, i) => (
                <tr key={p.id} className={editandoId === p.id ? "fila-editando" : ""}>
                  <td className="td-id">{i + 1}</td>
                  <td className="td-nombre">{p.nombre}</td>
                  <td className="td-edad">{p.edad} años</td>
                  <td><span className="badge-especialidad">{p.especialidad}</span></td>
                  <td>
                    <div className="acciones">
                      <button className="btn-editar" onClick={() => editarPaciente(p)}>Editar</button>
                      <button className="btn-eliminar" onClick={() => setModalId(p.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={modalId !== null}
        title="Eliminar Paciente"
        confirmText="Eliminar"
        danger
        onConfirm={confirmarEliminar}
        onCancel={() => setModalId(null)}
      >
        ¿Estás seguro de que deseas eliminar este paciente? Esta acción no se puede deshacer.
      </Modal>
    </div>
  );
}

export default Pacientes;
