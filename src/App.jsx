import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AISection from './components/AISection'
import ComedySection from './components/ComedySection'
import ResumeSection from './components/ResumeSection'
import PhotoGallery from './components/PhotoGallery'
import EmbedsSection from './components/EmbedsSection'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import BackgroundShapes from './components/BackgroundShapes'
import AsteroidsGame from './components/AsteroidsGame'

function App() {
  const [showGame, setShowGame] = useState(false)

  return (
    <div className="app">
      <BackgroundShapes />
      <Navbar />
      <main>
        <Hero onPlayGame={() => setShowGame(true)} />
        <AISection />
        <ComedySection />
        <ResumeSection />
        <PhotoGallery />
        <EmbedsSection />
      </main>
      <Footer />
      <Chatbot />
      {showGame && <AsteroidsGame onClose={() => setShowGame(false)} />}
    </div>
  )
}

export default App
