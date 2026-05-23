# 🌌 Multiverse Explorer (Pokémon & Rick and Morty App)

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Un proyecto avanzado de Next.js desarrollado para el curso de **Desarrollo de Aplicaciones Web Avanzado (Laboratorio 10)**. Esta aplicación demuestra la integración de múltiples APIs públicas utilizando diferentes estrategias de renderizado para optimizar el rendimiento y la experiencia del usuario.

## ✨ Características Principales

* **Pokédex Dinámica:** Búsqueda y visualización de Pokémon utilizando **Server-Side Rendering (SSR)** para garantizar que la información esté siempre actualizada y optimizada para SEO.
* **Directorio de Rick & Morty:** Exploración de personajes utilizando **Static Site Generation (SSG)** e **Incremental Static Regeneration (ISR)**, logrando tiempos de carga ultrarrápidos.
* **Interfaz Moderna:** Diseño atractivo, responsivo y "premium" construido íntegramente con **Tailwind CSS**.
* **Type Safety:** Tipado estricto en toda la aplicación utilizando **TypeScript** para evitar errores en tiempo de ejecución.
* **App Router:** Uso de la última arquitectura de Next.js (App Router) para una navegación más fluida y estructurada.

## 🚀 Tecnologías Utilizadas

* **Framework:** Next.js 15 (React 19)
* **Lenguaje:** TypeScript
* **Estilos:** Tailwind CSS
* **Despliegue:** Vercel
* **APIs Consumidas:** 
  * [PokéAPI](https://pokeapi.co/)
  * [The Rick and Morty API](https://rickandmortyapi.com/)

## 🛠️ Instalación y Uso Local

Para correr este proyecto en tu máquina local, sigue estos pasos:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Hazielcode/Desarrollo-de-Aplicaciones-Web-Avanzado-lab10.git
   ```

2. **Entra al directorio del proyecto:**
   ```bash
   cd Desarrollo-de-Aplicaciones-Web-Avanzado-lab10/multiverse-explorer
   ```

3. **Instala las dependencias:**
   ```bash
   npm install
   ```

4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abre la aplicación:**
   Visita [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📝 Conclusiones del Proyecto

1. **Renderizado Estratégico:** Aprender a combinar SSR y SSG en Next.js permite optimizar el rendimiento dependiendo de la volatilidad de los datos.
2. **TypeScript es clave:** Definir las interfaces de las APIs evitó errores comunes y facilitó el consumo de datos.
3. **App Router:** La estructura basada en carpetas hace que organizar las rutas sea mucho más intuitivo.
4. **Tailwind CSS:** Aceleró el diseño de interfaces modernas y responsivas sin depender de archivos CSS enormes.
5. **Vercel:** El despliegue continuo desde GitHub hizo que pasar a producción fuera rápido y sin complicaciones.

---

**Autor:** Samir Haziel ([@Hazielcode](https://github.com/Hazielcode))  
**Curso:** Desarrollo de Aplicaciones Web Avanzado
