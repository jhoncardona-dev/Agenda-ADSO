// Este componente muestra un contacto individual.
<<<<<<< HEAD
// Incluye nombre, teléfono, correo, etiqueta y botones de editar y eliminar.

export default function ContactoCard({ nombre, telefono, correo, etiqueta, onEliminar, onEditar }) {
=======
// Incluye nombre, teléfono, correo, etiqueta y el botón de eliminar.

export default function ContactoCard({ nombre, telefono, correo, etiqueta, onEliminar }) {
>>>>>>> 8d85c7aad1718da4af58d96c586e7c281518aa5b
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 flex items-start justify-between">
      {/* Información del contacto */}
      <div className="space-y-1">
        {/* Nombre */}
        <h3 className="text-xl font-semibold text-gray-800">{nombre}</h3>

        {/* Teléfono */}
        <p className="text-gray-600 text-sm flex items-center gap-2">
          <span className="text-purple-500 text-lg">📞</span>
          {telefono}
        </p>

        {/* Correo */}
        <p className="text-gray-600 text-sm flex items-center gap-2">
          <span className="text-purple-500 text-lg">✉️</span>
          {correo}
        </p>

        {/* Etiqueta (si existe) */}
        {etiqueta && (
          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full mt-2">
            {etiqueta}
          </span>
        )}
      </div>

<<<<<<< HEAD
      {/* Botones de acción */}
      <div className="flex gap-2">
        {/* Botón Editar ← nuevo */}
        <button
          type="button"
          onClick={onEditar}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg border border-gray-300 transition"
        >
          Editar
        </button>

        {/* Botón Eliminar */}
        <button
          type="button"
          onClick={onEliminar}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg shadow transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
=======
      {/* Botón de eliminar */}
      <button
        onClick={onEliminar}
        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg shadow transition"
      >
        Eliminar
      </button>
    </div>
  );
}
>>>>>>> 8d85c7aad1718da4af58d96c586e7c281518aa5b
