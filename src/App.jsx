import { useState, lazy, Suspense } from 'react'
import BootSequence from './components/BootSequence'
import Desktop from './components/Desktop'
import MenuBar from './components/MenuBar'
import Dock from './components/Dock'
import ClippyBubble from './components/ClippyBubble'
import MobileShell from './components/MobileShell'
import useIsMobile from './hooks/useIsMobile'
import SplashGuide from './components/guide/SplashGuide'
import { getLinkedArticleId } from './utils/articleLink'

const AsteroidsGame = lazy(() => import('./components/AsteroidsGame'))

const GUIDE_SEEN_KEY = 'jaredos-guide-seen'

function guideAlreadySeen() {
  // Direct article links skip the splash so the article is what people land on
  if (getLinkedArticleId()) return true
  try { return sessionStorage.getItem(GUIDE_SEEN_KEY) === '1' } catch { return false }
}

function App() {
  const [booted, setBooted] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const isMobile = useIsMobile()
  const [showGuide, setShowGuide] = useState(() => !guideAlreadySeen())

  const closeGuide = () => {
    try { sessionStorage.setItem(GUIDE_SEEN_KEY, '1') } catch { /* private mode: splash may show again */ }
    setShowGuide(false)
  }

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      {booted && isMobile && <MobileShell onOpenGame={() => setShowGame(true)} />}
      {booted && !isMobile && (
        <>
          <MenuBar />
          <Desktop />
          <Dock onOpenGame={() => setShowGame(true)} />
          <ClippyBubble />
        </>
      )}
      {booted && showGuide && <SplashGuide onClose={closeGuide} />}
      {showGame && (
        <Suspense fallback={<div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 text-white text-xl">Loading game...</div>}>
          <AsteroidsGame onClose={() => setShowGame(false)} />
        </Suspense>
      )}
    </>
  )
}

export default App
