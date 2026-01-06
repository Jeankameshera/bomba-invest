'use client'

import { useState, useEffect, useCallback } from 'react'

export default function Slideshow() {
  // Liste des images du slideshow
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slides = [
    { 
      src: '/images/slide1.jpg', 
      alt: 'Investissement 1',
      title: 'Opportunités Globales',
      description: 'Investissez dans des marchés émergents avec un fort potentiel de croissance'
    },
    { 
      src: '/images/slide2.jpg', 
      alt: 'Investissement 2',
      title: 'Stratégie Diversifiée',
      description: 'Portefeuille équilibré pour une croissance stable et sécurisée'
    },
    { 
      src: '/images/slide3.jpg', 
      alt: 'Investissement 3',
      title: 'Technologie Innovante',
      description: 'Capitalisez sur les avancées technologiques du futur'
    },
    { 
      src: '/images/slide4.jpg', 
      alt: 'Investissement 4',
      title: 'Développement Durable',
      description: 'Investissements responsables pour un avenir meilleur'
    },
    { 
      src: '/images/slide5.jpg', 
      alt: 'Investissement 5',
      title: 'Expertise Professionnelle',
      description: 'Notre équipe vous guide à chaque étape de votre investissement'
    },
    { 
      src: '/images/slide6.jpg', 
      alt: 'Investissement 6',
      title: 'Résultats Concrets',
      description: 'Des retours sur investissement qui dépassent les attentes'
    }
  ]
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Vérifie si les images existent
  useEffect(() => {
    const checkImages = async () => {
      const promises = slides.map(slide => {
        return new Promise((resolve) => {
          const img = new window.Image()
          img.onload = () => resolve(true)
          img.onerror = () => resolve(false)
          img.src = slide.src
        })
      })
      
      const results = await Promise.all(promises)
      console.log('Images chargées:', results)
      setIsLoading(false)
    }
    
    checkImages()
  }, [slides])

  // Changement automatique
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isAutoPlaying && !isTransitioning) {
      interval = setInterval(() => {
        setIsTransitioning(true)
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        
        // Réinitialise l'état de transition après l'animation
        setTimeout(() => setIsTransitioning(false), 1000)
      }, 5000)
    }
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, isTransitioning, slides.length])


  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [isTransitioning, slides.length])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [isTransitioning, slides.length])

  // Gestion du touch/swipe pour mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isTransitioning) return
    
    const distance = touchStart - touchEnd
    const minSwipeDistance = 50
    
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swipe gauche = slide suivant
        nextSlide()
      } else {
        // Swipe droite = slide précédent
        prevSlide()
      }
    }
    
    setTouchStart(0)
    setTouchEnd(0)
  }

  // Touches clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return
      
      switch(e.key) {
        case 'ArrowLeft':
          prevSlide()
          break
        case 'ArrowRight':
        case ' ':
          nextSlide()
          break
        case 'Escape':
          setIsAutoPlaying(prev => !prev)
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, isTransitioning])

  // Pendant le chargement
  if (isLoading) {
    return (
      <div className="w-full h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-red-900/30 border-t-red-900 rounded-full animate-spin mx-auto mb-6"></div>
          <div className="text-white text-xl font-light animate-pulse">Préparation de votre expérience...</div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="relative w-full h-screen overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides avec effet de zoom léger */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          {/* Image avec effet de parallaxe */}
          <div
            className="w-full h-full transform transition-transform duration-700 ease-out hover:scale-105"
            style={{
              backgroundImage: `url(${slide.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
            role="img"
            aria-label={slide.alt}
          ></div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Contenu du slide */}
          <div className={`absolute inset-0 flex items-center justify-center p-6 transition-all duration-700 delay-300 ${
            index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="max-w-4xl text-center text-white">            
              
              {/* Titre avec animation */}
              <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight transition-all duration-700 delay-500 ${
                index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                {slide.title}
              </h2>
              
              {/* Description */}
              <p className={`text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-700 ${
                index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                {slide.description}
              </p>
              
              {/* Call to action */}
              <div className={`transition-all duration-700 delay-1000 ${
                index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <button className="bg-red-900 hover:bg-red-800 text-white font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-green-600/30 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0">
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Flèches améliorées */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-30 group transition-all duration-300 ${
          isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
        }`}
        aria-label="Slide précédent"
      >
        <div className="bg-black/40 group-hover:bg-black/60 backdrop-blur-sm p-4 rounded-full transition-all duration-300">
          <svg className="w-8 h-8 text-white/90 group-hover:text-white group-hover:scale-110 transition-transform" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Précédent
        </div>
      </button>
      
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-30 group transition-all duration-300 ${
          isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
        }`}
        aria-label="Slide suivant"
      >
        <div className="bg-black/40 group-hover:bg-black/60 backdrop-blur-sm p-4 rounded-full transition-all duration-300">
          <svg className="w-8 h-8 text-white/90 group-hover:text-white group-hover:scale-110 transition-transform" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Suivant
        </div>
      </button>

      {/* Contrôles en bas à droite */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center space-x-4">
        {/* Bouton Play/Pause */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label={isAutoPlaying ? "Pause" : "Play"}
        >
          {isAutoPlaying ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>

        {/* Compteur */}
        <div className="bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full">
          <span className="font-bold text-lg">{currentSlide + 1}</span>
          <span className="mx-2 text-gray-300">/</span>
          <span className="font-light">{slides.length}</span>
        </div>
      </div>
      {/* Barre de progression */}
      <div className="absolute top-0 left-0 right-0 h-1 z-30 bg-gray-800/30">
        <div 
          className="h-full bg-linear-to-r from-red-700 to-red-700 transition-all duration-500 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`
          }}
        ></div>
      </div>
    </div>
  )
}