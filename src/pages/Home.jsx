import { Link } from 'react-router-dom';
import { useState } from 'react'
import { MOCK_BUILDS } from '../data/mockData';
import { BuildCard } from '../components/builds/BuildCard';
import { ClassFilter } from '../components/builds/ClassFilter';

export function Home() {

  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredBuilds = MOCK_BUILDS.filter((build) => {
    const matchClass = selectedClass === 'all' || build.jobClass === selectedClass;
    const matchType = selectedType === 'all' || build.buildType === selectedType;
    return matchClass && matchType;
  })

  return (
    <main>
      <h2>Últimas Builds Publicadas</h2>
      <p>Explora las mejores estrategias de la comunidad de Ragnarok Origin Classic.</p>

      <ClassFilter 
        selectedClass={selectedClass}
        onClassChange={setSelectedClass}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      <section className="build-list" style={{ marginTop: '20px' }}>
        {
          filteredBuilds.length > 0 ? (
            filteredBuilds.map((build) => (
              <BuildCard key={build.id} build={build}/>
            ))
          ) : (
            <p style={{ color: 'red', fontWeight: 'bold' }}>
            No se encontraron builds para esta combinación. ¡Sé el primero en crear una!
            </p>
          )
        }
      </section>
    </main>
  );
}