import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ================================
// METADONNÉES AVEC FAVICON
// ================================
export const metadata: Metadata = {
  title: "BOMBA Invest | Grow with Bomba . Invest with confidence.",
  description: "Bomba Invest: Your gateway to smart financial growth.",
  
  // ================================
  // CONFIGURATION DES ICÔNES
  // ================================
  icons: {
    // --------------------------------------------------
    // FAVICON PRINCIPAL (.ico) - Pour la plupart des navigateurs
    // --------------------------------------------------
    icon: "/favicon.ico",
    
    // --------------------------------------------------
    // ICÔNE POUR APPLE (iOS/Safari) - Format PNG recommandé
    // --------------------------------------------------
    apple: "/apple-touch-icon.png",
    
    // --------------------------------------------------
    // ICÔNE DE RACCOURCI - Pour certains navigateurs
    // --------------------------------------------------
    shortcut: "/icon.png",
    
    // --------------------------------------------------
    // AUTRES TAILLES (optionnel)
    // --------------------------------------------------
    // other: {
    //   rel: "icon",
    //   url: "/icon-32x32.png",
    //   sizes: "32x32",
    // },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ============================================= */}
        {/* BALISES <link> SUPPLÉMENTAIRES POUR MEILLEUR SUPPORT */}
        {/* ============================================= */}
        
        {/* Favicon principal - format .ico */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        
        {/* Favicon alternatif - format PNG (meilleure qualité) */}
        <link rel="icon" href="/icon.png" type="image/png" />
        
        {/* Pour les appareils Apple (iPhone, iPad) */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Pour les anciens navigateurs */}
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* ============================================= */}
        {/* POUR APPLICATION WEB PROGRESSIVE (PWA) - Optionnel */}
        {/* ============================================= */}
        {/* 
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#047857" />
        */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}