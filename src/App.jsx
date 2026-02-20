import { useState, lazy, Suspense } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AISection from './components/AISection'
import ResumeSection from './components/ResumeSection'
import PhotoGallery from './components/PhotoGallery'
import ProjectsSection from './components/ProjectsSection'
import EmbedsSection from './components/EmbedsSection'
import Footer from './components/Footer'
import BackgroundShapes from './components/BackgroundShapes'

const AsteroidsGame = lazy(() => import('./components/AsteroidsGame'))

function App() {
  const [showGame, setShowGame] = useState(false)

  return (
    <div className="app">
      <BackgroundShapes />
      <Navbar />
      <main>
        <Hero onPlayGame={() => setShowGame(true)} />
        <AISection />
        {/* <ComedySection /> */}
        <ProjectsSection />
        <ResumeSection />
        <PhotoGallery />
        <EmbedsSection />
      </main>
      <Footer />
      {showGame && (
        <Suspense fallback={<div className="game-loading">Loading game...</div>}>
          <AsteroidsGame onClose={() => setShowGame(false)} />
        </Suspense>
      )}
    </div>
  )
}

export default App
