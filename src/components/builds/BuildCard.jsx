import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './BuildCard.module.css';

const formatTag = (value) => {
  if (!value) return '';
  return `#${value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())}`;
};

export function BuildCard({ build }) {
  const [voteType, setVoteType] = useState(null);
  const [votesCount, setVotesCount] = useState(build.votes || 0);

  const handleUpvote = () => {
    if (voteType === 'up') {
      setVotesCount(votesCount - 1);
      setVoteType(null);
    } else if (voteType === 'down') {
      setVotesCount(votesCount + 2);
      setVoteType('up');
    } else {
      setVotesCount(votesCount + 1);
      setVoteType('up');
    }
  };

  const handleDownvote = () => {
    if (voteType === 'down') {
      setVotesCount(votesCount + 1);
      setVoteType(null);
    } else if (voteType === 'up') {
      setVotesCount(votesCount - 2);
      setVoteType('down');
    } else {
      setVotesCount(votesCount - 1);
      setVoteType('down');
    }
  };

  return (
    <article className={styles.card}>
      
      {/* 1. IMAGEN ARRIBA DE TODO */}
      <div className={styles['card-image-container']}>
        <img 
          src={build.imageUrl || 'https://via.placeholder.com/300x160'} 
          alt={build.title} 
          className={styles['card-image']} 
        />
      </div>

      {/* 2. CONTENIDO PRINCIPAL (Tags, Título, Descripción) */}
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

      {/* 3. FOOTER DE LA TARJETA (Votos y Enlace) */}
      <div className={styles.cardFooter}>
        <div className={styles.voteContainer}>
          <button 
            onClick={handleUpvote}
            className={voteType === 'up' ? `${styles.voteButton} ${styles.upvoted}` : styles.voteButton}
          >
            ▲
          </button>
          
          <span className={voteType === 'up' ? styles.countUp : voteType === 'down' ? styles.countDown : styles.countNeutral}>
            {votesCount}
          </span>

          <button 
            onClick={handleDownvote}
            className={voteType === 'down' ? `${styles.voteButton} ${styles.downvoted}` : styles.voteButton}
          >
            ▼
          </button>
        </div>
        
        <Link className={styles.cardLink} to={`/build/${build.id}`}>
          Ver guía completa →
        </Link>
      </div> 

    </article>
  );
}
