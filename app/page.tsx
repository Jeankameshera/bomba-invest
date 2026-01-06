'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, } from 'lucide-react'
import Slideshow from './Components/Slideshow'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Détecter le scroll pour ajouter une ombre
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Désactiver le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Navigation principale
  const navLinks = [
    { 
      name: 'Accueil', 
      href: '/'
    },
    { 
      name: 'À propos', 
      dropdown: [
        { name: 'Notre Histoire', href: '/about/history' },
        { name: 'Notre Équipe', href: '/about/team' },
        { name: 'Nos Valeurs', href: '/about/values' },
        { name: 'Certifications', href: '/about/certifications' }
      ]
    },
    { 
      name: 'Services', 
      dropdown: [
        { name: 'Investissement Immobilier', href: '/services/real-estate' },
        { name: 'Consulting Financier', href: '/services/consulting' },
        { name: 'Gestion de Projets', href: '/services/project-management' },
        { name: 'Formation & Coaching', href: '/services/training' }
      ]
    },
    { 
      name: 'Projets', 
      dropdown: [
        { name: 'Projets Réalisés', href: '/projects/completed' },
        { name: 'Projets en Cours', href: '/projects/ongoing' },
        { name: 'Projets à Venir', href: '/projects/upcoming' }
      ]
    },
    { 
      name: 'Contact', 
      href: '/contact'
    }
  ]

  // Informations de contact
  const contactInfo = [
    { icon: <Phone size={16} />, text: '+257 62 39 51 55', href: 'tel:+257 62 39 51 55' },
    { icon: <Mail size={16} />, text: 'info@bombainvest.com', href: 'mailto:info@bombainvest.com' },
    { icon: <MapPin size={16} />, text: 'Bujumbura, BURUNDI' }
  ]

  const socialLinks = [
    { icon: <Facebook size={18} />, href: 'https://www.facebook.com/profile.php?id=100064763406958&mibextid=wwXIfr&mibextid=wwXIfr', label: 'Facebook' },
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* ==================== */}
      {/* HEADER AMÉLIORÉ */}
      {/* ==================== */}
      <header className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-xl' : 'shadow-lg'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            
            {/* LOGO */}
            <div 
                  className="w-40 h-40 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: 'url(/images/logo.png)' }}
                  role="img"
                   aria-label="Logo Bomba Invest">
              </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={link.href || '#'}
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-red-900 font-medium transition-colors duration-200"
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown size={16} className="ml-1 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </a>
                  
                  {/* Dropdown Menu */}
                  {link.dropdown && activeDropdown === link.name && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50 animate-fadeIn">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-red-900 transition-colors duration-150"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="ml-4 flex items-center space-x-3">
                <button className="bg-red-900 hover:bg-red-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105">
                  Join Now
                </button>
                <button className="border-2 border-red-900 text-red-900 hover:bg-red-50 px-6 py-2 rounded-lg font-semibold transition-colors duration-200">
                  Login
                </button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700 hover:text-red-900 p-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'opacity-100 visible' 
              : 'opacity-0 invisible pointer-events-none'
          }`}>
            {/* Overlay sombre */}
            <div 
              className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-50' : 'opacity-0'
              }`}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu slide depuis la droite */}
            <div className={`absolute top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              
              {/* Header du menu mobile */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div 
                  className="w-40 h-40 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: 'url(/images/logo.png)' }}
                  role="img"
                   aria-label="Logo Bomba Invest">
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  aria-label="Fermer le menu"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Contenu du menu */}
              <div className="p-4 overflow-y-auto h-[calc(100vh-120px)]">
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.name} className="mb-1">
                      <a
                        href={link.href || '#'}
                        className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-900 rounded-lg transition-colors font-medium text-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                        {link.dropdown && (
                          <ChevronDown size={18} />
                        )}
                      </a>
                      
                      {/* Mobile Dropdown */}
                      {link.dropdown && (
                        <div className="ml-6 mt-1 mb-3 space-y-1 border-l-2 border-gray-200 pl-4">
                          {link.dropdown.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-2 text-gray-600 hover:text-red-900 hover:bg-gray-50 rounded transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Boutons CTA mobile */}
                  <div className="pt-6 mt-6 border-t border-gray-200">
                    <button 
                      className="w-full bg-red-900 hover:bg-red-800 text-white px-4 py-3 rounded-lg font-semibold mb-3 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Join Now
                    </button>
                    <button 
                      className="w-full border-2 border-red-900 text-red-900 hover:bg-gray-50 px-4 py-3 rounded-lg font-semibold transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== */}
      {/* CONTENU PRINCIPAL */}
      {/* ==================== */}
      <main className={`grow ${isMenuOpen ? 'opacity-50 transition-opacity duration-300' : ''}`}>
        {/* Section Hero AVEC SLIDESHOW */}
        <section className="relative min-h-screen">
          <Slideshow />
          
          
        </section>

        {/* Section Statistiques */}
        <section className="py-20 px-4 sm:px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Colonne gauche : Statistique */}
              <div className="text-center lg:text-left">
                <div className="text-7xl md:text-9xl font-black text-red-900 mb-4">
                  500+
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  PEOPLE WORKING WITH US
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Lorem ipsum is a dummy or placeholder text commonly used in graphic design, 
                  publishing and web development to fill empty spaces in a layout that do not yet.
                </p>
              </div>

              {/* Colonne droite : Horaires */}
              <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-700 mb-6">
                    Working Hours
                  </h3>
                  <div className="text-5xl font-black text-red-900 mb-4">
                    5:00 PM
                  </div>
                  <p className="text-xl text-gray-600 font-medium">
                    Tuesday - Monday
                  </p>
                  <div className="mt-8 pt-6 border-t border-gray-300">
                    <p className="text-gray-500">
                      We are available during these hours for consultations and support.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* ==================== */}
      {/* FOOTER */}
      {/* ==================== */}
      <footer className="bg-gray-900 text-white">{/* Middle Section - Liens et navigation */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              
              {/* Logo et Description */}
              <div>
                <div 
                  className="w-40 h-40 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: 'url(/images/logo.png)' }}
                  role="img"
                   aria-label="Logo Bomba Invest">
                </div>
                <p className="text-gray-400">
                  Leader dans les solutions d investissement innovantes depuis 2025. 
                  Nous transformons les défis en opportunités.
                </p>
              </div>
              
              {/* Liens Rapides */}
              <div>
                <h3 className="text-lg font-bold mb-4">Navigation</h3>
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href || '#'} 
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Services */}
              <div>
                <h3 className="text-lg font-bold mb-4">Nos Services</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Investissement Immobilier</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Consulting Financier</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gestion de Projets</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Formation & Coaching</a></li>
                </ul>
              </div>
              
              {/* Heures d'ouverture */}
              <div>
                <h3 className="text-lg font-bold mb-4">Horaires</h3>
                <div className="text-gray-400">
                  <p className="font-medium">Lundi - Vendredi</p>
                  <p>8:00 - 17:00</p>
                  <p className="mt-2 font-medium">Samedi</p>
                  <p>9:00 - 13:00</p>
                  <p className="mt-4 text-sm">Urgences: 24h/24</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Top Section*/}
        <div className="bg-gray-800 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Infos Contact */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Phone className="mr-2" size={20} />
                  Contactez-nous
                </h3>
                <div className="space-y-3">
                  {contactInfo.map((item, index) => (
                    item.href ? (
                      <a
                        key={index}
                        href={item.href}
                        className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.icon}
                        <span>{item.text}</span>
                      </a>
                    ) : (
                      <div key={index} className="flex items-center space-x-3 text-gray-300">
                        {item.icon}
                        <span>{item.text}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
              
              {/* Réseaux Sociaux */}
              <div>
                <h3 className="text-lg font-bold mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="
                        w-10 h-10 
                        flex items-center justify-center 
                        bg-gray-700 hover:bg-red-900 
                        rounded-full 
                        transition-colors duration-300
                      "
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <button className="mt-6 bg-red-900 hover:bg-red-800 px-6 py-2 rounded-lg font-medium transition-colors">
                  Demander un Devis
                </button>
              </div>
              
              {/* Newsletter */}
              <div>
                <h3 className="text-lg font-bold mb-4">Newsletter</h3>
                <p className="text-gray-300 mb-4">
                  Inscrivez-vous pour recevoir nos actualités
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 px-4 py-2 rounded-l-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-900"
                  />
                  <button className="bg-red-900 hover:bg-red-800 px-4 py-2 rounded-r-lg font-medium transition-colors">
                    S inscrire
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="bg-black py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-gray-400">
                  © {new Date().getFullYear()} BOMBA Invest • Copyright
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Ir Jean Kameshera • Directeur Général
                </p>
              </div>
              
              <div className="flex space-x-6">
                <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Confidentialité
                </a>
                <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Conditions
                </a>
                <a href="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Plan du site
                </a>
              </div>
            </div>
            
            {/* Crédits développement */}
            <div className="text-center mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-600 text-sm">
                Site développé par{' '}
                <a 
                  href="https://chroma-light.com" 
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mr_Chroma
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}