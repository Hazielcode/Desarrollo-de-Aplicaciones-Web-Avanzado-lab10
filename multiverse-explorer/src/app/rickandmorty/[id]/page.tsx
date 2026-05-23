import { Character, CharacterResponse } from '@/types/rickandmorty';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// ISR: Se revalida la data cada 10 días (10 * 24 * 60 * 60 = 864000 segundos)
async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 },
  });
  
  if (!res.ok) throw new Error('Personaje no encontrado en el multiverso');
  return res.json();
}

// SSG: Generamos las rutas estáticas de algunos personajes de forma anticipada
export async function generateStaticParams() {
  try {
    const res = await fetch('https://rickandmortyapi.com/api/character');
    if (!res.ok) return [];
    const data: CharacterResponse = await res.json();
    
    // Solo generamos los primeros 5 para evitar que el rate-limiting de la API nos tire el Build
    return data.results.slice(0, 5).map((char) => ({
      id: char.id.toString(),
    }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacter(id);
  
  return {
    title: `${character.name} | Rick and Morty`,
    description: `Conoce todos los detalles del personaje ${character.name} originario de ${character.origin.name}`,
  };
}

export default async function CharacterDetail({ params }: Props) {
  const { id } = await params;
  const character = await getCharacter(id);

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'alive': return 'bg-green-500';
      case 'dead': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex items-center justify-center font-sans">
      <div className="max-w-4xl w-full bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-700">
        
        {/* Imagen del personaje */}
        <div className="relative w-full md:w-2/5 h-96 md:h-auto">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
            priority // Imagen principal de la página, carga prioritaria
          />
        </div>

        {/* Detalles del personaje */}
        <div className="p-8 md:w-3/5 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">{character.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <span className={`w-4 h-4 rounded-full ${getStatusColor(character.status)} shadow-lg`}></span>
              <span className="text-xl text-gray-200 font-semibold">{character.status} - {character.species}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-gray-300">
              <div className="bg-gray-700/50 p-4 rounded-xl">
                <span className="block text-gray-400 text-sm font-medium mb-1">Género:</span>
                <span className="text-lg font-semibold text-white">{character.gender}</span>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-xl">
                <span className="block text-gray-400 text-sm font-medium mb-1">Tipo:</span>
                <span className="text-lg font-semibold text-white">{character.type || 'Desconocido'}</span>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-xl sm:col-span-2">
                <span className="block text-gray-400 text-sm font-medium mb-1">Origen:</span>
                <span className="text-lg font-semibold text-white">{character.origin.name}</span>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-xl sm:col-span-2">
                <span className="block text-gray-400 text-sm font-medium mb-1">Última ubicación conocida:</span>
                <span className="text-lg font-semibold text-white">{character.location.name}</span>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-xl sm:col-span-2">
                <span className="block text-gray-400 text-sm font-medium mb-1">Apariciones (Episodios):</span>
                <span className="text-lg font-semibold text-white">{character.episode.length} episodio(s)</span>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-xl sm:col-span-2">
                <span className="block text-gray-400 text-sm font-medium mb-1">Creado en API:</span>
                <span className="text-lg font-semibold text-white">
                  {new Date(character.created).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Link
              href="/rickandmorty"
              className="inline-block bg-[#97ce4c] hover:bg-[#7ba83c] text-gray-900 font-bold py-3 px-8 rounded-xl transition duration-300 shadow-[0_0_15px_rgba(151,206,76,0.3)] hover:shadow-[0_0_25px_rgba(151,206,76,0.5)] w-full text-center sm:w-auto"
            >
              ← Volver al Multiverso
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
