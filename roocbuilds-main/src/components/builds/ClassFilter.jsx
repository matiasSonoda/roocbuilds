import { useState, useRef, useEffect } from 'react';
import styles from './ClassFilter.module.css';

export function ClassFilter({ 
  selectedClass, 
  onClassChange, 
  selectedType, 
  onTypeChange 
}) {
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const classRef = useRef(null);
  const typeRef = useRef(null);

  // Cierra los menús si haces clic fuera de ellos
  useEffect(() => {
    function handleClickOutside(event) {
      if (classRef.current && !classRef.current.contains(event.target)) {
        setIsClassOpen(false);
      }
      if (typeRef.current && !typeRef.current.contains(event.target)) {
        setIsTypeOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const classes = [
    { value: 'all', label: 'Todas las Clases' },
    { value: 'Lord Knight', label: 'Lord Knight' },
    { value: 'Paladin', label: 'Paladin' },
    { value: 'Sniper', label: 'Sniper' },
    { value: 'Minstrel', label: 'Minstrel' },
    { value: 'Gypsy', label: 'Gypsy' },
    { value: 'Assasin Cross', label: 'Assasin Cross' },
    { value: 'Stalker', label: 'Stalker' },
    { value: 'High Priest', label: 'High Priest' },
    { value: 'Champion', label: 'Champion' },
    { value: 'High Wizzard', label: 'High Wizzard' },
    { value: 'Professor', label: 'Professor' },
    { value: 'Biochemist', label: 'Biochemist' }
  ];

  const types = [
    { value: 'all', label: 'PvE y PvP' },
    { value: 'PVE', label: 'PvE (MVP)' },
    { value: 'PVP', label: 'PvP (Player vs Player)' },
    { value: 'WOE', label: 'WOE (War of Emperium)' }
  ];

  const currentClassLabel = classes.find(c => c.value === selectedClass)?.label || 'Todas las Clases';
  const currentTypeLabel = types.find(t => t.value === selectedType)?.label || 'PvE y PvP';

  return (
    <section className={styles.filterContainer}>
      
      {/* BOTÓN DESPLEGABLE DE CLASE */}
      <div className={styles.dropdownWrapper} ref={classRef}>
        <button 
          type="button"
          className={styles.dropdownButton}
          onClick={() => setIsClassOpen(!isClassOpen)}
        >
          <div className={styles.buttonTextContent}>
            <span className={styles.buttonCategory}>Clase</span>
            <span className={styles.buttonValue}>{currentClassLabel}</span>
          </div>
          <span className={`${styles.arrow} ${isClassOpen ? styles.arrowOpen : ''}`}>▼</span>
        </button>

        {isClassOpen && (
          <div className={styles.dropdownMenu}>
            {classes.map((c) => (
              <button
                key={c.value}
                type="button"
                className={`${styles.dropdownItem} ${selectedClass === c.value ? styles.activeItem : ''}`}
                onClick={() => {
                  onClassChange(c.value);
                  setIsClassOpen(false);
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* BOTÓN DESPLEGABLE DE TIPO */}
      <div className={styles.dropdownWrapper} ref={typeRef}>
        <button 
          type="button"
          className={styles.dropdownButton}
          onClick={() => setIsTypeOpen(!isTypeOpen)}
        >
          <div className={styles.buttonTextContent}>
            <span className={styles.buttonCategory}>Tipo</span>
            <span className={styles.buttonValue}>{currentTypeLabel}</span>
          </div>
          <span className={`${styles.arrow} ${isTypeOpen ? styles.arrowOpen : ''}`}>▼</span>
        </button>

        {isTypeOpen && (
          <div className={styles.dropdownMenu}>
            {types.map((t) => (
              <button
                key={t.value}
                type="button"
                className={`${styles.dropdownItem} ${selectedType === t.value ? styles.activeItem : ''}`}
                onClick={() => {
                  onTypeChange(t.value);
                  setIsTypeOpen(false);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

    </section>
  );
}