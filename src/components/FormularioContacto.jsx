import { useEffect, useState } from "react";

export default function FormularioContacto({ onAgregar, onActualizar, contactoEnEdicion, onCancelarEdicion }) {
  const [form, setForm] = useState({ nombre: "", telefono: "", correo: "", etiqueta: "" });
  const [errores, setErrores] = useState({ nombre: "", telefono: "", correo: "" });
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (contactoEnEdicion) {
      setForm({
        nombre: contactoEnEdicion.nombre || "",
        telefono: contactoEnEdicion.telefono || "",
        correo: contactoEnEdicion.correo || "",
        etiqueta: contactoEnEdicion.etiqueta || "",
      });
      setErrores({ nombre: "", telefono: "", correo: "" });
    } else {
      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
      setErrores({ nombre: "", telefono: "", correo: "" });
    }
  }, [contactoEnEdicion]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function validarFormulario() {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (form.telefono.trim().length < 7) {
      nuevosErrores.telefono = "El teléfono debe tener al menos 7 dígitos.";
    }
    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }
    setErrores(nuevosErrores);
    return !nuevosErrores.nombre && !nuevosErrores.telefono && !nuevosErrores.correo;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    try {
      setEnviando(true);
      if (contactoEnEdicion) {
        await onActualizar({ ...form, id: contactoEnEdicion.id });
      } else {
        await onAgregar(form);
      }
      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
      setErrores({ nombre: "", telefono: "", correo: "" });
    } finally {
      setEnviando(false);
    }
  };

  const estaEnEdicion = Boolean(contactoEnEdicion);

  return (
    <form onSubmit={onSubmit} className="space-y-6">

      <h2 className="text-lg font-semibold text-gray-900">
        {estaEnEdicion ? "Editar contacto" : "Nuevo contacto"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input
            className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            name="nombre"
            placeholder="Ej: Camila Pérez"
            value={form.nombre}
            onChange={onChange}
          />
          {errores.nombre && <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
          <input
            className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            name="telefono"
            placeholder="Ej: 300 123 4567"
            value={form.telefono}
            onChange={onChange}
          />
          {errores.telefono && <p className="text-red-500 text-sm mt-1">{errores.telefono}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Correo *</label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
        />
        {errores.correo && <p className="text-red-500 text-sm mt-1">{errores.correo}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Etiqueta (opcional)</label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="etiqueta"
          placeholder="Ej: Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <button
          type="submit"
          disabled={enviando}
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm disabled:bg-purple-300 disabled:cursor-not-allowed"
        >
          {enviando ? "Guardando..." : estaEnEdicion ? "Guardar cambios" : "Agregar contacto"}
        </button>

        {estaEnEdicion && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            className="w-full md:w-auto bg-gray-100 text-gray-700 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-200 text-sm"
          >
            Cancelar edición
          </button>
        )}
      </div>

    </form>
  );
}