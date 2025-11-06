import { useEffect, useState } from "react";
import { User, LogOut } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export function ZonaUsuario({ onAbrirLogin }) {
  const [usuario, setUsuario] = useState(null);

  // 🔹 Escuchar cambios de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <>
      {/* 🔹 Si NO hay usuario */}
      {!usuario ? (
        <li className="relative group ml-4">
          <button
            onClick={onAbrirLogin}
            className="p-2 rounded-full bg-white text-indigo-600 hover:bg-indigo-100 transition"
          >
            <User size={20} />
          </button>

          {/* Tooltip */}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Iniciar sesión
          </span>
        </li>
      ) : (
        // 🔹 Si hay usuario autenticado
        <li className="flex items-center gap-2 ml-4">
          {/* Círculo con inicial */}
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-indigo-600 font-bold shadow-md">
            {usuario.displayName
              ? usuario.displayName.charAt(0).toUpperCase()
              : usuario.email.charAt(0).toUpperCase()}
          </div>

          {/* Botón logout */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-white text-indigo-600 hover:bg-indigo-100 transition"
            title="Cerrar sesión"
          >
            <LogOut size={18} />
          </button>
        </li>
      )}
    </>
  );
}
