import { useEffect, useState } from "react";
import {
  listarContactos,
  crearContacto,
  actualizarContacto,
  eliminarContactoPorId,
} from "./api.js";
import { APP_INFO } from "./config";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  // Cargar contactos al inicio (GET)
  useEffect(() => {
    async function cargarContactos() {
      try {
        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar los contactos. Verifica que el servidor esté activo.");
      } finally {
        setCargando(false);
      }
    }
    cargarContactos();
  }, []);

  // Crear contacto (POST)
  const agregarContacto = async (nuevo) => {
    try {
      setError("");
      const creado = await crearContacto(nuevo);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error(error);
      setError("No se pudo guardar el contacto. Verifica tu conexión.");
    }
  };

  // Actualizar contacto (PUT)
  const onActualizarContacto = async (contactoActualizado) => {
    try {
      setError("");
      const actualizado = await actualizarContacto(contactoActualizado.id, contactoActualizado);
      setContactos((prev) =>
        prev.map((c) => (c.id === actualizado.id ? actualizado : c))
      );
      setContactoEnEdicion(null);
    } catch (error) {
      console.error(error);
      setError("No se pudo actualizar el contacto. Intenta nuevamente.");
      throw error;
    }
  };

  // Eliminar contacto (DELETE)
  const eliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
      setContactoEnEdicion((actual) => (actual && actual.id === id ? null : actual));
    } catch (error) {
      console.error(error);
      setError("No se pudo eliminar el contacto. Revisa la conexión.");
    }
  };

  const onEditarClick = (contacto) => {
    setContactoEnEdicion(contacto);
    setError("");
  };

  const onCancelarEdicion = () => setContactoEnEdicion(null);

  // Búsqueda y ordenamiento
  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();
    return (
      c.nombre.toLowerCase().includes(termino) ||
      c.correo.toLowerCase().includes(termino) ||
      (c.etiqueta || "").toLowerCase().includes(termino)
    );
  });

  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="max-w-6xl mx-auto px-6 pt-8">
        <p className="text-sm font-semibold text-gray-400 tracking-[0.25em] uppercase">
          Programa ADSO · Ficha {APP_INFO.ficha}
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
          {APP_INFO.titulo}
        </h1>
        <p className="text-gray-500 mt-1">{APP_INFO.subtitulo}</p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {cargando && (
          <div className="rounded-xl bg-purple-50 border border-purple-200 px-4 py-3 text-sm text-purple-700">
            Cargando contactos desde la API...
          </div>
        )}

        <FormularioContacto
          onAgregar={agregarContacto}
          onActualizar={onActualizarContacto}
          contactoEnEdicion={contactoEnEdicion}
          onCancelarEdicion={onCancelarEdicion}
        />

        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <input
            type="text"
            className="w-full md:flex-1 rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
            placeholder="Buscar por nombre, correo o etiqueta..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setOrdenAsc((prev) => !prev)}
            className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200"
          >
            {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
          </button>
        </div>

        <div className="space-y-4">
          {contactosOrdenados.length === 0 && !cargando && (
            <p className="text-gray-500 text-sm">No se encontraron contactos.</p>
          )}
          {contactosOrdenados.map((c) => (
            <ContactoCard
              key={c.id}
              {...c}
              onEliminar={() => eliminarContacto(c.id)}
              onEditar={() => onEditarClick(c)}
            />
          ))}
        </div>

      </section>
    </main>
  );
}