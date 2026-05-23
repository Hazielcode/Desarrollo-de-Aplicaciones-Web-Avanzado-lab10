import { CharacterResponse } from '@/types/rickandmorty';
import CharacterSearch from '@/components/CharacterSearch';

async function getInitialCharacters(): Promise<CharacterResponse> {
  // Petición al servidor (Server Component) que fuerza el caché en build time (SSG)
  const res = await fetch('https://rickandmortyapi.com/api/character', {
    cache: 'force-cache',
  });
  
  if (!res.ok) throw new Error('Error al cargar personajes de Rick and Morty');
  return res.json();
}

export default async function HomePage() {
  const data = await getInitialCharacters();
  
  return (
    <div className="min-h-screen bg-gray-900 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#97ce4c] to-[#00b5cc] drop-shadow-sm">
            Rick and Morty API
          </h1>
          <p className="text-gray-400 text-lg">
            Explora el multiverso estáticamente (SSG) y dinámicamente (CSR)
          </p>
        </div>
        
        {/* Componente que maneja el CSR y los resultados */}
        <CharacterSearch initialData={data.results} />
      </div>
    </div>
  );
}
