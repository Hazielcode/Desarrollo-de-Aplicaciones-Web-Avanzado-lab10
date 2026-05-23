import Link from "next/link";
import { IoHelpCircle } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-gray-800 to-black px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border-4 border-yellow-500 transform transition-all hover:scale-105">
        <IoHelpCircle size={80} className="text-yellow-500 mx-auto mb-6 animate-bounce" />
        
        <h2 className="text-6xl font-extrabold text-gray-800 mb-2">404</h2>
        <h3 className="text-2xl font-bold text-gray-700 mb-4">¡Página no encontrada!</h3>
        
        <p className="text-gray-600 mb-8">
          Parece que un Psyduck confundido nos guió por el camino equivocado. No pudimos encontrar el Pokémon o la ruta que buscas.
        </p>
        
        <Link
          href="/pokemon"
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 inline-block transform hover:scale-105 active:scale-95"
        >
          Volver a la Pokédex
        </Link>
      </div>
    </div>
  );
}
