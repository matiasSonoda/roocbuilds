import styles from './ClassFilter.module.css';

export function ClassFilter({ 
  selectedClass, 
  onClassChange, 
  selectedType, 
  onTypeChange 
}) {
  return (
    <section className={styles.filterContainer}>
      {/* Filtro por Clase */}
      <div className={styles.optionJobClass}>
        <label htmlFor="jobClassFilter" className={styles.label}>Clase:</label>
        <select 
          id="jobClassFilter"
          value={selectedClass} 
          onChange={(e) => onClassChange(e.target.value)}
          className={styles.select}
        >
          <option value="all">Todas las Clases</option>
          <option value="Lord Knight">Lord Knight</option>
          <option value="Paladin">Paladin</option>
          <option value="Sniper">Sniper</option>
          <option value="Minstrel">Minstrel</option>
          <option value="Gypsy">Gypsy</option>
          <option value="Assasin Cross">Assasin Cross</option>
          <option value="Stalker">Stalker</option>
          <option value="High Priest">High Priest</option>
          <option value="Champion">Champion</option>
          <option value="High Wizzard">High Wizzard</option>
          <option value="Professor">Professor</option>
          <option value="Mastersmith">Biochemist</option>
        </select>
      </div>

      {/* Filtro por Tipo de Juego */}
      <div className={styles.optionBuildType}>
        <label htmlFor="typeFilter" className={styles.label}>Tipo:</label>
        <select 
          id="typeFilter"
          value={selectedType} 
          onChange={(e) => onTypeChange(e.target.value)}
          className={styles.select}
        >
          <option value="all">PvE y PvP</option>
          <option value="PVE">PvE (MVP)</option>
          <option value="PVP">PvP (Player vs Player)</option>
          <option value="WOE">WOE (War of Emperium)</option>
        </select>
      </div>
    </section>
  );
}