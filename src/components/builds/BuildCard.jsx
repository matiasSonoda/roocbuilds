import { Link } from 'react-router-dom';
import styles from './BuildCard.module.css';

const formatTag = (value) => {
  if (!value) return '';
  return `#${value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())}`;
};

export function BuildCard({ build }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardTopRow}>
        <div className={styles.cardTags}>
          <span className={styles.cardTag}>{formatTag(build.jobClass)}</span>
          <span className={styles.cardTag}>{formatTag(build.buildType)}</span>
        </div>
        <span className={styles.cardDate}>{build.createdAt}</span>
      </div>

      <h3 className={styles.cardTitle}>{build.title}</h3>
      <p className={styles.cardDescription}>{build.description}</p>

      <div className={styles.cardDivider} />

      <div className={styles.cardFooter}>
        <span className={styles.cardVotes}>▲ {build.votes} Votos</span>
        <Link className={styles.cardLink} to={`/build/${build.id}`}>
          Ver guía completa →
        </Link>
      </div>
    </article>
  );
}