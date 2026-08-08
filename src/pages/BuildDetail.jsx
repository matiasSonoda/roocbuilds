// src/pages/BuildDetail.jsx
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { MOCK_BUILDS } from '../data/mockData';

export function BuildDetail() {
  // 1. Extraemos el ID de la URL (ej: si la ruta es /build/1, id valdrá '1')
  const { id } = useParams();

  // 2. Buscamos la build en nuestra base de datos falsa
  const build = MOCK_BUILDS.find((b) => b.id === id);

  // 3. Manejo de errores: ¿Qué pasa si el usuario ingresa un ID que no existe?
  if (!build) {
    return (
      <main style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Build no encontrada</h2>
        <p>El pergamino que buscas se ha perdido en los archivos de Prontera...</p>
        <Link to="/" style={{ color: '#0066cc' }}>Volver al inicio</Link>
      </main>
    );
  }

  // 4. Sanitizamos el contenido por seguridad antes de mostrarlo
  // Si la build no tiene contenido (como la 2 o la 3 de nuestro mock), ponemos un texto por defecto
  const rawHTML = build.content || '<p>El autor aún no ha escrito la guía detallada.</p>';
  const cleanHTML = DOMPurify.sanitize(rawHTML);

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#0066cc', fontWeight: 'bold' }}>
        ← Volver a todas las builds
      </Link>
      
      <article style={{ 
        marginTop: '20px', 
        backgroundColor: '#140d0d', 
        padding: '20px', 
        borderRadius: '8px', 
        border: '1px solid #ccc' 
      }}>
        <header style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{build.title}</h1>
          
          <div style={{ display: 'flex', gap: '20px', color: '#555', fontSize: '0.9rem' }}>
            <span><strong>Clase:</strong> <span style={{ textTransform: 'capitalize' }}>{build.jobClass}</span></span>
            <span><strong>Autor:</strong> {build.author}</span>
            <span><strong>Publicado:</strong> {build.createdAt}</span>
          </div>
        </header>

        {/* 5. INYECCIÓN DEL HTML */}
        <div 
          className="tiptap-content"
          dangerouslySetInnerHTML={{ __html: cleanHTML }} 
        />
      </article>
    </main>
  );
}