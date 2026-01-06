'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image' // ⭐ Importez le composant Image

export default function Slideshow() {
  // Liste des images du slideshow avec vérification
  const slides = [
    { src: '/images/slide1.jpg', alt: 'Investissement 1' },
    { src: '/images/slide2.jpg', alt: 'Investissement 2' },
    { src: '/images/slide3.jpg', alt: 'Investissement 3' },
    { src: '/images/slide4.jpg', alt: 'Investissement 4' },
    { src: '/images/slide5.jpg', alt: 'Investissement 5' },
    { src: '/images/slide6.jpg', alt: 'Investissement 6' }
  ]
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

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
  }, [])

  // Changement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Pendant le chargement
  if (isLoading) {
    return (
      <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Chargement des images...</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides avec Image component */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Utilisez soit img soit Image de Next.js */}
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Indicateurs */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>

      {/* Flèches */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white z-20 bg-black/30 p-2 rounded-full"
        aria-label="Image précédente"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>      
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white z-20 bg-black/30 p-2 rounded-full"
        aria-label="Image suivante"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}