import { Link, useLocation } from "react-router-dom";
import { Home, Users, MessageSquare, ShoppingBag } from "lucide-react";
import { ZonaUsuario } from "./ZonaUsuario";

export default function Navbar({ abrirAuth }) {
  const location = useLocation();

  const links = [
    { path: "/", label: "Inicio", icon: <Home size={16} /> },
    { path: "/usuarios", label: "Usuarios", icon: <Users size={16} /> },
    { path: "/post", label: "Post", icon: <MessageSquare size={16} /> },
    { path: "/productos", label: "Productos", icon: <ShoppingBag size={16} /> },
  ];

  return (
    <nav className="bg-indigo-400 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* 🌸 Logo o título (más pegado a la izquierda) */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition ml-[-1rem]"
        >
          <h1 className="text-2xl font-bold tracking-wide">
            <span className="text-indigo-50 drop-shadow-sm">My</span>
            <span className="text-pink-100 drop-shadow-sm">Firebase</span>
            <span className="text-yellow-100 drop-shadow-sm">App</span>
          </h1>
        </Link>

        {/* 🔹 Links de navegación */}
        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center gap-2 transition font-medium rounded-lg px-3 py-2 ${
                  location.pathname === link.path
                    ? "bg-indigo-500 text-white shadow-sm"
                    : "hover:bg-indigo-300 hover:text-white"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}

          {/* Línea divisora */}
          <li>
            <div className="h-6 w-px bg-white/50 mx-2"></div>
          </li>

          {/* 🔹 Zona de usuario */}
          <ZonaUsuario onAbrirLogin={abrirAuth} />
        </ul>
      </div>
    </nav>
  );
}
