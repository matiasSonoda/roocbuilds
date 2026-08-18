import { Link } from 'react-router-dom';
import styles from './BuildCard.module.css';

export function BuildCard({ build }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{build.title}</h3>
        <span className={styles.cardClass}>[{build.jobClass}]</span>
      </div>

      <p className={styles.cardMeta}>Por: {build.author} | {build.createdAt}</p>
      <p className={styles.cardDescription}>{build.description}</p>

      <div className={styles.cardFooter}>
        <span className={styles.cardVotes}>▲ {build.votes} Votos</span>
        <Link className={styles.cardLink} to={`/build/${build.id}`}>
          Ver guía completa →
        </Link>
      </div>
    </article>
  );
}