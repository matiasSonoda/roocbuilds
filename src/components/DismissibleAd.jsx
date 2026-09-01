import { useState } from 'react';
import styles from './DismissibleAd.module.css';

export function DismissibleAd() {
    const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null; // Si el usuario hace clic en la X, el anuncio desaparece

    return (
    <div className={styles.adWrapper}>
        <button 
        onClick={() => setIsVisible(false)} 
        className={styles.closeButton}
        aria-label="Cerrar anuncio"
        >
        ×
        </button>
        <div className={styles.adContent}>
        <span>Espacio publicitario descartable</span>
        </div>
    </div>
    );
}
/* Esto es para los anuncios que pueden ser descartados por el usuario */