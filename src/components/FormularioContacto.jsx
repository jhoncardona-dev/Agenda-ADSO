import { useState } from "react";

export default function Formulario({ onAdd }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: ""
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd(form); // 🔥 ahora sí agrega el contacto
    setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-md rounded-lg p-5 flex flex-col gap-4 mb-6"
    >
      <label>Nombre *</label>
      <input name="nombre" value={form.nombre} onChange={onChange} className="border p-2"/>

      <label>Teléfono *</label>
      <input name="telefono" value={form.telefono} onChange={onChange} className="border p-2"/>

      <label>Correo *</label>
      <input name="correo" value={form.correo} onChange={onChange} className="border p-2"/>

      <label>Etiqueta</label>
      <input name="etiqueta" value={form.etiqueta} onChange={onChange} className="border p-2"/>

      <button className="bg-purple-600 text-white py-2 rounded">
        Agregar contacto
      </button>
    </form>
  );
}