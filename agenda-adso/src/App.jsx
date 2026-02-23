import './App.css'

export default function App() {
  const fecha = new Date().toLocaleString();

  return (
    <main>
      <h1>Hola, Soy Jhon Fredy Cardona Quintero - Aprendiz ADSO</h1>

      <p>
        En este curso de React espero aprender a crear aplicaciones web modernas,
        dinámicas y reutilizables utilizando componentes, props y hooks.
        Mi objetivo es fortalecer mis habilidades como desarrollador frontend,
        entender mejor el manejo del estado y desarrollar proyectos más
        organizados y profesionales.
      </p>

      <small>{fecha}</small>
    </main>
  );
}