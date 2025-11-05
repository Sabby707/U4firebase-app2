import { useState, useEffect } from "react";
import { storage } from "../lib/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";

export function Productos() {
  const [imagen, setImagen] = useState(null);
  const [imagenes, setImagenes] = useState([]); // todas las imágenes subidas
  const [subiendo, setSubiendo] = useState(false);

  // 🔹 Cargar imágenes existentes al inicio
  useEffect(() => {
    cargarImagenes();
  }, []);

  const cargarImagenes = async () => {
    const carpetaRef = ref(storage, "imagenes/");
    const resultado = await listAll(carpetaRef);

    const urls = await Promise.all(
      resultado.items.map(async (item) => ({
        nombre: item.name,
        url: await getDownloadURL(item),
      }))
    );

    setImagenes(urls);
  };

  // 🔹 Subir nueva imagen
  const subirImagen = async () => {
    if (!imagen) return alert("⚠️ Primero selecciona una imagen.");
    setSubiendo(true);

    const imagenRef = ref(storage, `imagenes/${Date.now()}_${imagen.name}`);
    await uploadBytes(imagenRef, imagen);

    setImagen(null);
    setSubiendo(false);

    // Volver a cargar la lista
    cargarImagenes();
  };

  // 🔹 Eliminar imagen
  const eliminarImagen = async (nombre) => {
    if (!confirm("¿Seguro que deseas eliminar esta imagen?")) return;

    const imgRef = ref(storage, `imagenes/${nombre}`);
    await deleteObject(imgRef);

    setImagenes((prev) => prev.filter((img) => img.nombre !== nombre));
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center py-10 px-4">
      <div className="bg-white rounded-3xl shadow-md border border-pink-100 p-8 w-full max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6">
          🛍️ Galería de Productos
        </h2>

        {/* Selector de archivo */}
        <div className="mb-6">
          <label
            htmlFor="selector-imagen"
            className="cursor-pointer bg-indigo-400 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl shadow transition"
          >
            Seleccionar Imagen
          </label>
          <input
            type="file"
            accept="image/*"
            id="selector-imagen"
            onChange={(e) => setImagen(e.target.files[0])}
            className="hidden"
          />

          {imagen && (
            <p className="mt-3 text-sm text-gray-600">
              Imagen seleccionada: <span className="font-medium">{imagen.name}</span>
            </p>
          )}
        </div>

        {/* Botón de subir */}
        <button
          onClick={subirImagen}
          disabled={subiendo}
          className={`${
            subiendo
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-pink-400 hover:bg-pink-500"
          } text-white px-5 py-2.5 rounded-xl shadow transition`}
        >
          {subiendo ? "Subiendo..." : "⬆️ Subir Imagen"}
        </button>

        {/* Galería de imágenes */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            📸 Imágenes subidas
          </h3>

          {imagenes.length === 0 ? (
            <p className="text-gray-500 italic">Aún no hay imágenes subidas</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {imagenes.map((img) => (
                <div
                  key={img.nombre}
                  className="bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm p-3 flex flex-col items-center"
                >
                  <img
                    src={img.url}
                    alt={img.nombre}
                    className="w-48 h-48 object-cover rounded-xl shadow mb-3 border border-white"
                  />
                  <p className="text-sm text-gray-600 truncate max-w-[10rem] mb-2">
                    {img.nombre}
                  </p>
                  <button
                    onClick={() => eliminarImagen(img.nombre)}
                    className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg text-sm shadow-sm transition"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
