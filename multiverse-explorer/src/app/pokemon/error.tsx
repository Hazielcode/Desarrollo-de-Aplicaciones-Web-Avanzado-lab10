"use client"; // Los componentes de error deben ser componentes de cliente (Client Components)

import { useEffect } from "react";
import { IoWarning } from "react-icons/io5";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Aquí podrías enviar el error a un servicio de reporte de errores
    console.error("Error capturado por Error Boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 min-h-[70vh]">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border-4 border-red-500 transform transition-all hover:-translate-y-2">
        <IoWarning size={80} className="text-red-500 mx-auto mb-6 animate-pulse" />
        
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
          ¡Oh no! Un Snorlax salvaje bloquea el camino.
        </h2>
        
        <p className="text-gray-600 mb-8">
          Ha ocurrido un problema al intentar cargar la información.
          <br />
          <span className="font-semibold text-red-500 mt-2 block">
            {error.message || "Error desconocido."}
          </span>
        </p>
        
        <button
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          onClick={
            // Intenta recuperar la página volviendo a renderizar el segmento
            () => reset()
          }
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
