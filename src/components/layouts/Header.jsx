import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header style={{ borderBottom: '1px solid black', padding: '10px' }}>
      <h1>Ragnarok Origin Classic Builds</h1>
      <nav>
        <Link to="/" style={{ marginRight: '15px' }}>Inicio</Link>
        <Link to="/create">Publicar Build</Link>
      </nav>
    </header>
  );
}