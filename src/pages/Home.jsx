import { useEffect, useState } from 'react';
import { BuildCard } from '../components/builds/BuildCard';
import { ClassFilter } from '../components/builds/ClassFilter';
import { Banner } from '../components/layouts/banner';
import styles from './Home.module.css';
import { getHome } from '../api/buildApi.js';

export function Home() {
  const [build, setBuild] = useState([]);
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
        ) : (
          <p className={styles['empty-state']}>
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