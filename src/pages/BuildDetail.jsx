// src/pages/BuildDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { sanitizeBuildContent } from '../components/create-build/buildFormUtils';
import styles from './BuildDetails.module.css';
import { ENDPOINTS } from '../config/apiConfig';
import { useBuild } from '../hooks/useBuild.js';
import { PATHS } from '../config/routes';

export function BuildDetail() {
  const { id } = useParams();
  
  // Consumimos nuestro Custom Hook delegando toda la complejidad
  const { buildDetails, loading, error } = useBuild(id);

  if (loading) {
    return <main className='content-wrapper'><p>Loading wisdom from Rune Midgard...</p></main>;
  }

  if (error || !buildDetails) {
    return <main className='content-wrapper'><p>{error || "Build not found"}</p></main>;
  }

  const cleanHTML = sanitizeBuildContent(buildDetails.content);

  return (
    <main>
      <article className={styles.articleWrapper}>
        {/* Usamos nuestro diccionario de rutas para el botón de volver */}
        <Link to={PATHS.HOME}>
          ← Back to all builds
        </Link>
        
        <header className={styles.headerWrapper}>
          <div className={styles.headerMetaData}>
            <h1 className={styles.title}>{buildDetails.title}</h1>
            <div className={styles.metaRow}>
            <span className={styles.metaData}><strong>Clase:</strong> <span>{buildDetails.jobClass}</span></span>
            <span className={styles.metaData}><strong>Tipo:</strong> <span>{buildDetails.buildType}</span></span>
            </div>
            <div className={styles.metaRow}>
            <span className={styles.metaData}><strong>Autor:</strong> {buildDetails.author}</span>
            <span className={styles.metaData}><strong>Publicado:</strong> {buildDetails.createdAt}</span>
            </div>
          </div>
        </header>

        <div
          className={styles.tiptapContent}
          dangerouslySetInnerHTML={{ __html: cleanHTML }} 
        />
      </article>
    </main>
  );
}