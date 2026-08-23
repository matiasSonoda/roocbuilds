import { Header } from './components/layouts/Header';
import { Footer } from './components/layouts/Footer';
import './App.css';
import { Home } from './pages/Home';
import { CreateBuild } from './pages/CreateBuild';
import { BuildDetail } from './pages/BuildDetail';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='app-shell'>
      <Header />
      <main className='content-wrapper'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateBuild />} />
          <Route path='/build/:id' element={<BuildDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;