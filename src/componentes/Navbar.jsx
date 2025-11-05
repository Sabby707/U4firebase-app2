import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Inicio" },
    { path: "/usuarios", label: "Usuarios" },
    { path: "/post", label: "Post" },
    { path: "/productos", label: "Productos" },
    { path: "/registro", label: "Registro" }, // 👈 nuevo
    { path: "/login", label: "Iniciar Sesión" }, // 👈 nuevo
  ];

  return (
    <nav className="bg-indigo-400 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo o título */}
        <h1 className="text-2xl font-semibold tracking-wide">
          🌸 MyFirebaseApp
        </h1>

        {/* Links de navegación */}
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`transition font-medium rounded-lg px-3 py-2 ${
                  location.pathname === link.path
                    ? "bg-indigo-500 text-white shadow-sm"
                    : "hover:bg-indigo-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
