export function Inicio() {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center py-10 px-4 text-center">
      {/* Encabezado principal */}
      <div className="bg-white p-10 rounded-3xl shadow-lg border border-pink-100 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-indigo-500 mb-3">
          🌸 Bienvenida a <span className="text-pink-400">MyFirebaseApp</span>
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Tu espacio para gestionar usuarios, crear publicaciones y explorar productos.  
          Todo con el encanto de una interfaz suave y organizada ✨
        </p>

        {/* Sección de botones de acceso rápido */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a
            href="/usuarios"
            className="bg-indigo-400 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl shadow-sm transition"
          >
            👥 Usuarios
          </a>
          <a
            href="/post"
            className="bg-pink-300 hover:bg-pink-400 text-white px-5 py-2.5 rounded-xl shadow-sm transition"
          >
            💬 Posts
          </a>
          <a
            href="/productos"
            className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 px-5 py-2.5 rounded-xl shadow-sm transition"
          >
            🛍️ Productos
          </a>
        </div>

        {/* Tarjetas informativas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-indigo-100 p-4 rounded-2xl shadow-sm border border-indigo-200">
            <h3 className="text-indigo-600 font-semibold text-lg">Usuarios</h3>
            <p className="text-gray-700 text-sm">Administra nuevos y existentes con facilidad.</p>
          </div>
          <div className="bg-pink-100 p-4 rounded-2xl shadow-sm border border-pink-200">
            <h3 className="text-pink-500 font-semibold text-lg">Publicaciones</h3>
            <p className="text-gray-700 text-sm">Crea, edita y comparte mensajes en tiempo real.</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-2xl shadow-sm border border-yellow-200">
            <h3 className="text-yellow-600 font-semibold text-lg">Productos</h3>
            <p className="text-gray-700 text-sm">Agrega, actualiza o elimina tus artículos fácilmente.</p>
          </div>
        </div>
      </div>

      {/* Pie decorativo */}
      <footer className="mt-12 text-gray-500 text-sm">
        Hecho con 💕 y Firebase — {new Date().getFullYear()}
      </footer>
    </div>
  );
}
