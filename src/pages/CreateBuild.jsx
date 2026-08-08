import { CreateBuildForm } from "../components/CreateBuildForm";
export function CreateBuild() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Escribir un nuevo Pergamino</h2>
      <p style={{ color: '#555', marginBottom: '20px' }}>
        Comparte tu sabiduría con otros aventureros. Detalla tus stats, cartas recomendadas y estrategia.
      </p>
      
      {/* Renderizamos nuestro componente complejo aquí */}
      <CreateBuildForm />
    </main>
  );
}