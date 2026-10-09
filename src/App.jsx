import { Header } from './components/layouts/Header'
import { Footer } from './components/layouts/Footer'
import './App.css'
import { Home } from './pages/Home'
import { CreateBuild } from './pages/CreateBuild'
import { BuildDetail } from './pages/BuildDetail'
import { Routes, Route } from 'react-router-dom'
import { PATHS } from './config/routes'

function App() {
  return (
    <div className='app-shell'>
      <Header />
      <main className='content-wrapper'>
        <Routes>
          <Route path={PATHS.HOME} element={<Home />} />
          <Route path={PATHS.CREATE} element={<CreateBuild />} />
          <Route path={PATHS.BUILD_DETAILS()} element={<BuildDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
