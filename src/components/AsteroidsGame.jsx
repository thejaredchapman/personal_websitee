import { useEffect, useRef, useState, useCallback } from 'react'
import './AsteroidsGame.css'

function AsteroidsGame({ onClose }) {
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('asteroids-high-score') || '0')
  })

  const initGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // Get accent color from CSS
    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent-500').trim() || '#f97316'

    // Game state
    const game = {
      ship: {
        x: width / 2,
        y: height / 2,
        angle: -Math.PI / 2,
        velocityX: 0,
        velocityY: 0,
        radius: 15,
        thrusting: false,
        rotatingLeft: false,
        rotatingRight: false,
        invincible: false,
        invincibleTimer: 0,
      },
      asteroids: [],
      bullets: [],
      particles: [],
      keys: {},
      running: true,
      score: 0,
      lives: 3,
    }

    gameRef.current = game

    // Spawn initial asteroids
    const spawnAsteroids = (count, size = 'large') => {
      const sizes = { large: 40, medium: 25, small: 15 }
      const points = { large: 20, medium: 50, small: 100 }

      for (let i = 0; i < count; i++) {
        let x, y
        do {
          x = Math.random() * width
          y = Math.random() * height
        } while (Math.hypot(x - game.ship.x, y - game.ship.y) < 150)

        game.asteroids.push({
          x,
          y,
          velocityX: (Math.random() - 0.5) * 3,
          velocityY: (Math.random() - 0.5) * 3,
          radius: sizes[size],
          size,
          points: points[size],
          vertices: generateAsteroidVertices(),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
        })
      }
    }

    function generateAsteroidVertices() {
      const vertices = []
      const numVertices = 8 + Math.floor(Math.random() * 5)
      for (let i = 0; i < numVertices; i++) {
        const angle = (i / numVertices) * Math.PI * 2
        const radius = 0.7 + Math.random() * 0.3
        vertices.push({ angle, radius })
      }
      return vertices
    }

    spawnAsteroids(5)

    // Input handling
    const handleKeyDown = (e) => {
      game.keys[e.code] = true
      if (e.code === 'Space') {
        e.preventDefault()
        shoot()
      }
    }

    const handleKeyUp = (e) => {
      game.keys[e.code] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    function shoot() {
      if (game.bullets.length < 10) {
        game.bullets.push({
          x: game.ship.x + Math.cos(game.ship.angle) * game.ship.radius,
          y: game.ship.y + Math.sin(game.ship.angle) * game.ship.radius,
          velocityX: Math.cos(game.ship.angle) * 10,
          velocityY: Math.sin(game.ship.angle) * 10,
          life: 50,
        })
      }
    }

    function createExplosion(x, y, color, count = 15) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 4 + 1
        game.particles.push({
          x,
          y,
          velocityX: Math.cos(angle) * speed,
          velocityY: Math.sin(angle) * speed,
          life: 30 + Math.random() * 20,
          color,
          size: Math.random() * 3 + 1,
        })
      }
    }

    function update() {
      if (!game.running) return

      const ship = game.ship

      // Ship rotation
      if (game.keys['ArrowLeft'] || game.keys['KeyA']) {
        ship.angle -= 0.08
      }
      if (game.keys['ArrowRight'] || game.keys['KeyD']) {
        ship.angle += 0.08
      }

      // Ship thrust
      if (game.keys['ArrowUp'] || game.keys['KeyW']) {
        ship.thrusting = true
        ship.velocityX += Math.cos(ship.angle) * 0.15
        ship.velocityY += Math.sin(ship.angle) * 0.15
      } else {
        ship.thrusting = false
      }

      // Apply friction
      ship.velocityX *= 0.99
      ship.velocityY *= 0.99

      // Move ship
      ship.x += ship.velocityX
      ship.y += ship.velocityY

      // Wrap around screen
      if (ship.x < 0) ship.x = width
      if (ship.x > width) ship.x = 0
      if (ship.y < 0) ship.y = height
      if (ship.y > height) ship.y = 0

      // Update invincibility
      if (ship.invincible) {
        ship.invincibleTimer--
        if (ship.invincibleTimer <= 0) {
          ship.invincible = false
        }
      }

      // Update bullets
      game.bullets = game.bullets.filter(bullet => {
        bullet.x += bullet.velocityX
        bullet.y += bullet.velocityY
        bullet.life--

        // Wrap around
        if (bullet.x < 0) bullet.x = width
        if (bullet.x > width) bullet.x = 0
        if (bullet.y < 0) bullet.y = height
        if (bullet.y > height) bullet.y = 0

        return bullet.life > 0
      })

      // Update asteroids
      game.asteroids.forEach(asteroid => {
        asteroid.x += asteroid.velocityX
        asteroid.y += asteroid.velocityY
        asteroid.rotation += asteroid.rotationSpeed

        // Wrap around
        if (asteroid.x < -asteroid.radius) asteroid.x = width + asteroid.radius
        if (asteroid.x > width + asteroid.radius) asteroid.x = -asteroid.radius
        if (asteroid.y < -asteroid.radius) asteroid.y = height + asteroid.radius
        if (asteroid.y > height + asteroid.radius) asteroid.y = -asteroid.radius
      })

      // Bullet-asteroid collision
      game.bullets.forEach((bullet, bulletIndex) => {
        game.asteroids.forEach((asteroid, asteroidIndex) => {
          const dist = Math.hypot(bullet.x - asteroid.x, bullet.y - asteroid.y)
          if (dist < asteroid.radius) {
            // Remove bullet
            game.bullets.splice(bulletIndex, 1)

            // Add score
            game.score += asteroid.points
            setScore(game.score)

            // Create explosion
            createExplosion(asteroid.x, asteroid.y, accentColor)

            // Split asteroid
            if (asteroid.size === 'large') {
              for (let i = 0; i < 2; i++) {
                game.asteroids.push({
                  x: asteroid.x,
                  y: asteroid.y,
                  velocityX: (Math.random() - 0.5) * 4,
                  velocityY: (Math.random() - 0.5) * 4,
                  radius: 25,
                  size: 'medium',
                  points: 50,
                  vertices: generateAsteroidVertices(),
                  rotation: Math.random() * Math.PI * 2,
                  rotationSpeed: (Math.random() - 0.5) * 0.08,
                })
              }
            } else if (asteroid.size === 'medium') {
              for (let i = 0; i < 2; i++) {
                game.asteroids.push({
                  x: asteroid.x,
                  y: asteroid.y,
                  velocityX: (Math.random() - 0.5) * 5,
                  velocityY: (Math.random() - 0.5) * 5,
                  radius: 15,
                  size: 'small',
                  points: 100,
                  vertices: generateAsteroidVertices(),
                  rotation: Math.random() * Math.PI * 2,
                  rotationSpeed: (Math.random() - 0.5) * 0.1,
                })
              }
            }

            // Remove asteroid
            game.asteroids.splice(asteroidIndex, 1)
          }
        })
      })

      // Ship-asteroid collision
      if (!ship.invincible) {
        game.asteroids.forEach(asteroid => {
          const dist = Math.hypot(ship.x - asteroid.x, ship.y - asteroid.y)
          if (dist < ship.radius + asteroid.radius - 5) {
            game.lives--
            setLives(game.lives)

            createExplosion(ship.x, ship.y, '#ffffff', 30)

            if (game.lives <= 0) {
              game.running = false
              setGameOver(true)
              if (game.score > highScore) {
                setHighScore(game.score)
                localStorage.setItem('asteroids-high-score', game.score.toString())
              }
            } else {
              // Reset ship position
              ship.x = width / 2
              ship.y = height / 2
              ship.velocityX = 0
              ship.velocityY = 0
              ship.invincible = true
              ship.invincibleTimer = 180
            }
          }
        })
      }

      // Spawn new asteroids if all destroyed
      if (game.asteroids.length === 0) {
        spawnAsteroids(5 + Math.floor(game.score / 500))
      }

      // Update particles
      game.particles = game.particles.filter(particle => {
        particle.x += particle.velocityX
        particle.y += particle.velocityY
        particle.velocityX *= 0.98
        particle.velocityY *= 0.98
        particle.life--
        return particle.life > 0
      })
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.fillRect(0, 0, width, height)

      const ship = game.ship

      // Draw particles
      game.particles.forEach(particle => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.life / 50
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // Draw bullets
      ctx.fillStyle = accentColor
      game.bullets.forEach(bullet => {
        ctx.beginPath()
        ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw asteroids
      game.asteroids.forEach(asteroid => {
        ctx.save()
        ctx.translate(asteroid.x, asteroid.y)
        ctx.rotate(asteroid.rotation)

        ctx.beginPath()
        asteroid.vertices.forEach((vertex, i) => {
          const x = Math.cos(vertex.angle) * asteroid.radius * vertex.radius
          const y = Math.sin(vertex.angle) * asteroid.radius * vertex.radius
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })
        ctx.closePath()
        ctx.strokeStyle = '#888'
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.fillStyle = 'rgba(100, 100, 100, 0.3)'
        ctx.fill()

        ctx.restore()
      })

      // Draw ship
      if (!ship.invincible || Math.floor(ship.invincibleTimer / 5) % 2 === 0) {
        ctx.save()
        ctx.translate(ship.x, ship.y)
        ctx.rotate(ship.angle)

        // Ship body
        ctx.beginPath()
        ctx.moveTo(20, 0)
        ctx.lineTo(-15, -12)
        ctx.lineTo(-10, 0)
        ctx.lineTo(-15, 12)
        ctx.closePath()
        ctx.strokeStyle = accentColor
        ctx.lineWidth = 2
        ctx.stroke()

        // Thrust flame
        if (ship.thrusting) {
          ctx.beginPath()
          ctx.moveTo(-10, -6)
          ctx.lineTo(-25 - Math.random() * 10, 0)
          ctx.lineTo(-10, 6)
          ctx.strokeStyle = '#ff6b35'
          ctx.stroke()
        }

        ctx.restore()
      }
    }

    function gameLoop() {
      if (game.running) {
        update()
        draw()
        requestAnimationFrame(gameLoop)
      }
    }

    gameLoop()

    return () => {
      game.running = false
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [highScore])

  useEffect(() => {
    const cleanup = initGame()
    return cleanup
  }, [initGame])

  const restartGame = () => {
    setScore(0)
    setLives(3)
    setGameOver(false)
    initGame()
  }

  return (
    <div className="asteroids-game-overlay">
      <div className="asteroids-game-container">
        <div className="asteroids-header">
          <div className="asteroids-score">Score: {score}</div>
          <div className="asteroids-lives">
            Lives: {'▲'.repeat(lives)}
          </div>
          <div className="asteroids-high-score">High: {highScore}</div>
          <button className="asteroids-close" onClick={onClose}>×</button>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="asteroids-canvas"
        />

        {gameOver && (
          <div className="asteroids-game-over">
            <h2>Game Over</h2>
            <p>Score: {score}</p>
            {score >= highScore && <p className="new-high-score">New High Score!</p>}
            <button onClick={restartGame}>Play Again</button>
          </div>
        )}

        <div className="asteroids-controls">
          <p>Arrow Keys or WASD to move | Space to shoot</p>
        </div>
      </div>
    </div>
  )
}

export default AsteroidsGame
