// src/components/Header/Header.jsx
// (Importamos { Nav } y reemplazamos el <ul>)

import React from 'react'
import "./Header.css"
// Importamos el componente Nav. 
// Ajusta la ruta si 'Nav' no está en la carpeta 'components/Nav'
import { Nav } from '../Nav/Nav' 

const Header = () => {
  return (
    <header className='header'>
        <nav className='header-nav'>
            
            {/* 1. El logo se mantiene como lo hicimos antes */}
            <a href="/" className="header-logo-link">
              <img 
                src="/images/logo.png" 
                alt="Logo de la empresa" 
                className="header-logo" 
              />
            </a>

            {/* 2. Reemplazamos el <ul> estático por el componente <Nav /> */}
            <Nav />

        </nav>
    </header>
  )
}

export default Header