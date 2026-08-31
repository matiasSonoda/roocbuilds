// src/pages/BuildDetail.jsx
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './BuildDetails.module.css';
export function BuildDetail() {
  // 1. Extraemos el ID de la URL (ej: si la ruta es /build/1, id valdrá '1')
  const { id } = useParams();
  const [buildDetails, setBuildDetails] = useState(null);
  const [loading, setLoading] = useState(true);

    
  useEffect(() => {
    const url = `http://localhost:8080/api/v1/builds/${id}`;
      fetch(url)
        .then((response)=>{
          if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) =>{
          setBuildDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          throw new Error(`Response status: ${error.status}. Message: ${error.message}`);
          setLoading(false);
        });
  },[id]);
  if (loading === true){
    return <main className='content-wrapper'><p>Loading wisdom from Rune Midgard...</p></main>
  }

  if (!buildDetails){
    return <main className='content-wrapper'><p>Build not found</p></main>
  }
    console.log(buildDetails);
  // 4. Sanitizamos el contenido por seguridad antes de mostrarlo
  // Si la build no tiene contenido (como la 2 o la 3 de nuestro mock), ponemos un texto por defecto
  const rawHTML = buildDetails.content;
  const cleanHTML = DOMPurify.sanitize(rawHTML);

  return (
    <main>
      <article className={styles.articleWrapper}>
        <Link to="/">
        ← Volver a todas las builds
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

        {/* 5. INYECCIÓN DEL HTML */}
        <div
          className={styles.tiptapContent}
          dangerouslySetInnerHTML={{ __html: cleanHTML }} 
        />
      </article>
    </main>
  );
}