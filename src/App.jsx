import { useState, lazy, Suspense } from 'react'
import BootSequence from './components/BootSequence'
import Desktop from './components/Desktop'
import MenuBar from './components/MenuBar'
import Dock from './components/Dock'

const AsteroidsGame = lazy(() => import('./components/AsteroidsGame'))

function App() {
  const [booted, setBooted] = useState(false)
  const [showGame, setShowGame] = useState(false)

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      {booted && (
        <>
          <MenuBar />
          <Desktop />
          <Dock onOpenGame={() => setShowGame(true)} />
        </>
      )}
      {showGame && (
        <Suspense fallback={<div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 text-white text-xl">Loading game...</div>}>
          <AsteroidsGame onClose={() => setShowGame(false)} />
        </Suspense>
      )}
    </>
  )
}

export default App
