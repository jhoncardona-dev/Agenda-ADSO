import { useState, useEffect } from "react";
import Formulario from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  // 🔥 Cargar desde localStorage al iniciar
  const [contactos, setContactos] = useState(() => {
    const guardados = localStorage.getItem("contactos");
    return guardados ? JSON.parse(guardados) : [];
  });

  // 🔥 Guardar en localStorage cada vez que cambien los contactos
  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  const agregarContacto = (nuevo) => {
    const contactoConId = {
      id: Date.now(),
      ...nuevo,
    };
    setContactos([...contactos, contactoConId]);
  };

  const eliminarContacto = (id) => {
    const nuevosContactos = contactos.filter((c) => c.id !== id);
    setContactos(nuevosContactos);
  };

  return (
    <main className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-2">
        Agenda ADSO v4
      </h1>

      <p className="text-gray-500 text-center mb-6">
        Interfaz moderna con TailwindCSS + LocalStorage
      </p>

      {/* Formulario */}
      <Formulario onAdd={agregarContacto} />

      {/* Lista de contactos */}
      {contactos.length === 0 ? (
        <p className="text-center text-gray-400">
          No hay contactos guardados
        </p>
      ) : (
        contactos.map((c) => (
          <ContactoCard
            key={c.id}
            id={c.id}
            nombre={c.nombre}
            descripcion={c.telefono}
            correo={c.correo}
            etiqueta={c.etiqueta}
            onDelete={eliminarContacto}
          />
        ))
      )}
    </main>
  );
}