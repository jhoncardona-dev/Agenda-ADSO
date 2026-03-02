export default function ContactoCard({
  id,
  nombre,
  descripcion,
  correo,
  etiqueta,
  onDelete,
}) {
  return (
    <article className="bg-white border rounded-lg shadow-sm p-4 mb-4">
      <h3 className="text-lg font-semibold">{nombre}</h3>

      {etiqueta && (
        <p className="text-xs bg-purple-500 text-white px-2 py-1 w-fit rounded">
          {etiqueta}
        </p>
      )}

      <p>{descripcion}</p>
      {correo && <p>✉️ {correo}</p>}

      <button
        className="bg-red-500 text-white px-3 py-1 rounded mt-2"
        onClick={() => onDelete(id)}
      >
        Eliminar
      </button>
    </article>
  );
}