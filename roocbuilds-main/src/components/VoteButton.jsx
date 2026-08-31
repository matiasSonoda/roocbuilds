import { useState } from 'react';
import styles from './VoteButton.module.css';

export function VoteButton({ initialVotes = 0, onVoteChange }) {
    const [hasVoted, setHasVoted] = useState(false);
    const [votes, setVotes] = useState(initialVotes); 

    const handleVoteClick = () => {
    if (hasVoted) {
      // Si ya había votado, quita el voto y vuelve al estado original
        setVotes(prev => prev - 1);
        setHasVoted(false);
        if (onVoteChange) onVoteChange(false);
    } else {
      // Si no había votado, suma el voto y se activa
        setVotes(prev => prev + 1);
        setHasVoted(true);
        if (onVoteChange) onVoteChange(true);
    }
    };

    return (
    <button 
        onClick={handleVoteClick} 
        className={`${styles.voteButton} ${hasVoted ? styles.voted : ''}`}
        aria-label="Votar build"
    >
        <svg 
        className={styles.voteIcon} 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={hasVoted ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth="2"
        >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className={styles.voteCount}>{votes}</span>
    </button>
    );
}