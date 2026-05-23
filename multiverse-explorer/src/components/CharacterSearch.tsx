'use client';

import { useState, useEffect } from 'react';
import { Character } from '@/types/rickandmorty';
import Image from 'next/image';
import Link from 'next/link';

interface CharacterSearchProps {
  initialData: Character[];
}

export default function CharacterSearch({ initialData }: CharacterSearchProps) {
  const [characters, setCharacters] = useState<Character[]>(initialData);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si no hay filtros aplicados, mostramos los datos iniciales provistos por SSG
    if (!name && !status && !type && !gender) {
      setCharacters(initialData);
      return;
    }

    const fetchFiltered = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (name) query.append('name', name);
        if (status) query.append('status', status);
        if (type) query.append('type', type);
        if (gender) query.append('gender', gender);

        // Client-Side Rendering (CSR) para búsqueda en tiempo real
        const res = await fetch(`https://rickandmortyapi.com/api/character/?${query.toString()}`);
        if (!res.ok) {
          setCharacters([]); 
        } else {
          const data = await res.json();
          setCharacters(data.results);
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    // Implementar un pequeño debounce para no saturar la API
    const timeoutId = setTimeout(() => {
      fetchFiltered();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [name, status, type, gender, initialData]);

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'alive': return 'bg-green-500';
      case 'dead': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Contenedor de Búsqueda y Filtros */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 flex-wrap items-center justify-between">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
          <input 
            type="text" 
            placeholder="Ej. Rick, Morty..." 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 outline-hidden focus:ring-2 focus:ring-green-500 transition"
          />
        </div>
        <div className="w-full md:w-auto flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-1">Estado</label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 outline-hidden focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="">Cualquiera</option>
            <option value="alive">Vivo</option>
            <option value="dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>
        <div className="w-full md:w-auto flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-1">Tipo</label>
          <input 
            type="text" 
            placeholder="Ej. Parasite..." 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 outline-hidden focus:ring-2 focus:ring-green-500 transition"
          />
        </div>
        <div className="w-full md:w-auto flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-1">Género</label>
          <select 
            value={gender} 
            onChange={(e) => setGender(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 outline-hidden focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="">Cualquiera</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
            <option value="genderless">Sin género</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>
      </div>

      {/* Resultados */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Buscando en el multiverso...</p>
        </div>
      ) : characters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((char) => (
            <Link key={char.id} href={`/rickandmorty/${char.id}`}>
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 transition transform duration-300">
                <div className="relative h-64 w-full">
                  <Image
                    src={char.image}
                    alt={char.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy" // Carga bajo demanda
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-2xl font-bold text-white truncate mb-2">{char.name}</h2>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-3 h-3 rounded-full ${getStatusColor(char.status)}`}></span>
                    <span className="text-sm text-gray-300 font-medium">{char.status} - {char.species}</span>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-400 mb-1">Última ubicación conocida:</p>
                    <p className="text-gray-200 truncate">{char.location.name}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-2xl">No se encontraron personajes que coincidan con la búsqueda.</p>
        </div>
      )}
    </div>
  );
}
