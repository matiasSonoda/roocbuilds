import { Link } from 'react-router-dom';

export function BuildCard({ build }) {
  return (
    <article 
      style={{ 
        border: '1px solid #ccc', 
        padding: '15px', 
        marginBottom: '15px', 
        borderRadius: '8px',
        backgroundColor: '#140d0d'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{build.title}</h3>
        <span style={{ fontWeight: 'bold', textTransform: 'capitalize', color: 'blue' }}>
          [{build.jobClass}]
        </span>
      </div>
      
      <p style={{ color: '#555', fontSize: '0.9rem' }}>Por: {build.author} | {build.createdAt}</p>
      <p>{build.description}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <span style={{ fontWeight: 'bold', color: 'green' }}>▲ {build.votes} Votos</span>
        <Link to={`/build/${build.id}`} style={{ textDecoration: 'none', color: '#0066cc', fontWeight: 'bold' }}>
          Ver guía completa →
        </Link>
      </div>
    </article>
  );
}