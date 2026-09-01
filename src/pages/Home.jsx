import { useEffect, useState } from 'react';
import { BuildCard } from '../components/builds/BuildCard';
import { ClassFilter } from '../components/builds/ClassFilter';
import { Banner } from '../components/layouts/Banner.jsx'
import styles from './Home.module.css';
import { getHome } from '../api/buildApi.js';
import {MOCK_BUILDS } from '../data/mockData.js'

/* arriba se encuentran las importaciones con los Hooks escenciales de React para manejar el estado local y los efectos secundarios, tambien componentes visuales,los filtros y los estilos y API para cargar los estilos de modulos CSS */

export function Home() {
  const [build, setBuild] = useState([]);
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
/* Estados del Componente: Almacena el arreglo de builds desde la API, guarda los criterios filtrados seleccionados por el usuario (selected) y controla la paginacion de la tabla/lista (currentPage o itemsPerPage) */

  const filteredBuilds = build.filter((build) => {
    const matchClass = selectedClass === 'all' || build.jobClass === selectedClass;
    const matchType = selectedType === 'all' || build.buildType === selectedType;
    return matchClass && matchType;
  });

  const totalPages = Math.max(1, Math.ceil(filteredBuilds.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedBuilds = filteredBuilds.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );
/* Logica de Filtrado y Paginacion: Filtra el listado general (filtered), Calculacuantas paginas totales se necesitan segun los elementos filtrados (totalPages) */

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedClass, selectedType]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    getHome().then((data) => {
      setBuild(data);
    });
  },[])
/* Efectos: Primer efecto- si el usuario cambia los filtros(selected CLass o Type) la pagina se reinicia automaticamentea la pagina 1. Segundo efecto- Garantiza que si el total de paginas disminuye por algun cambio, la pag actual se mantenga dentro de un rango valido. Tercer efecto- Al montar el componente por primera vez (dentro de las corcheas), usa la funcion "getHome()"Ipara traer datos de la API y guardarlos en el esttado build */

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
            No se encontraron builds para esta combinación. ¡Sé el primero en crear una!
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
            Anterior
          </button>
          {/* Aca tambien se aplico la tipografia e cuerpo (Inter) */}
          <span className={`${styles['pagination-info']} ${styles['textoCuerpo']}`}></span>
          <span className={styles['pagination-info']}>
            Página {safeCurrentPage} de {totalPages}
          </span>

          <button
            className={styles['pagination-button']}
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={safeCurrentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </main>
  );
}
/* Banner y Filtros: Renderiza la cabecera y el componente filtrado, pasandoles los estados y funciones para modificarlos. Lista de Builds: Muestra un contenedor con las tarjetas renderizadas ( .map() ). Controles de Paginacion: Renderiza los botones anterior y siguiente junto con el texto de la pag actual solo si la cantidad de builds supera el limite por pag (itemsPerPage) */