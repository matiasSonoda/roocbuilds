import { BuildCard } from '../components/builds/BuildCard';
import { ClassFilter } from '../components/builds/ClassFilter';
import { Banner } from '../components/layouts/Banner.jsx'
import styles from './Home.module.css';
import { useHome } from '../hooks/useHome.js';

export function Home() {
  
  const {itemsPerPage,
    filteredBuilds,
    selectedClass,
    setCurrentPage,
    setSelectedClass,
    selectedType,
    setSelectedType,
    totalPages,
    safeCurrentPage,
    paginatedBuilds} = useHome();

  return (
    <main className={styles['home-container']}>
      <Banner />
      
      <ClassFilter
        selectedClass={selectedClass}
        onClassChange={setSelectedClass}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      <section className={styles['build-list']}>
        {filteredBuilds.length > 0 ? (
          paginatedBuilds.map((build) => (
            <BuildCard key={build.id} build={build} />
          ))
        ) : ( /* Aca aplique la tipografia de cuerpo (Inter) */
          <p className={`${styles['empty-state']} ${styles['textoCuerpo']}`}>
            No builds were found for this combination. Be the first to create one!
          </p>
        )}
      </section>

      {filteredBuilds.length > itemsPerPage && (
        <div className={styles['pagination']}>
          <button
            className={styles['pagination-button']}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={safeCurrentPage === 1}
          >
            Previous
          </button>
          {/* Aca tambien se aplico la tipografia e cuerpo (Inter) */}
          <span className={`${styles['pagination-info']} ${styles['textoCuerpo']}`}></span>
          <span className={styles['pagination-info']}>
            Page {safeCurrentPage} of {totalPages}
          </span>

          <button
            className={styles['pagination-button']}
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={safeCurrentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
/* Banner y Filtros: Renderiza la cabecera y el componente filtrado, pasandoles los estados y funciones para modificarlos. Lista de Builds: Muestra un contenedor con las tarjetas renderizadas ( .map() ). Controles de Paginacion: Renderiza los botones anterior y siguiente junto con el texto de la pag actual solo si la cantidad de builds supera el limite por pag (itemsPerPage) */