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
          <option value="knight">Knight</option>
          <option value="wizard">Wizard</option>
          <option value="hunter">Hunter</option>
          <option value="assassin">Assassin</option>
          <option value="priest">Priest</option>
          <option value="blacksmith">Blacksmith</option>
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
          <option value="pve">PvE (Monstruos/MVP)</option>
          <option value="pvp">PvP (Jugadores/WoE)</option>
        </select>
      </div>
    </section>
  );
}