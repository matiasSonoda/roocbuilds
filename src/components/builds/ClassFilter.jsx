export function ClassFilter({ 
  selectedClass, 
  onClassChange, 
  selectedType, 
  onTypeChange 
}) {
  return (
    <section 
      style={{ 
        display: 'flex', 
        gap: '20px', 
        padding: '15px', 
        backgroundColor: '#140d0d', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}
    >
      {/* Filtro por Clase */}
      <div>
        <label htmlFor="jobClassFilter" style={{ fontWeight: 'bold', marginRight: '10px' }}>Clase:</label>
        <select 
          id="jobClassFilter"
          value={selectedClass} 
          onChange={(e) => onClassChange(e.target.value)}
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
      <div>
        <label htmlFor="typeFilter" style={{ fontWeight: 'bold', marginRight: '10px' }}>Tipo:</label>
        <select 
          id="typeFilter"
          value={selectedType} 
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="all">PvE y PvP</option>
          <option value="pve">PvE (Monstruos/MVP)</option>
          <option value="pvp">PvP (Jugadores/WoE)</option>
        </select>
      </div>
    </section>
  );
}