import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function Post() {
  const [post, setPost] = useState([]);
  const [texto, setTexto] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const consulta = query(collection(db, "post"));
    const unsubscribe = onSnapshot(consulta, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPost(docs);
    });
    return () => unsubscribe();
  }, []);

  const agregarPost = async () => {
    if (!texto.trim()) return alert("⚠️ No hay mensaje que enviar");
    await addDoc(collection(db, "post"), {
      mensaje: texto,
      createdAt: new Date(),
    });
    setTexto("");
  };

  const borrarPost = async (id) => {
    if (!confirm("¿Eliminar este mensaje?")) return;
    await deleteDoc(doc(db, "post", id));
  };

  const comenzarEdicion = (m) => {
    setEditId(m.id);
    setEditText(m.mensaje ?? "");
  };

  const guardarEdicion = async () => {
    if (!editId) return;
    const ref = doc(db, "post", editId);
    await updateDoc(ref, {
      mensaje: editText,
      updatedAt: new Date(),
    });
    setEditId(null);
    setEditText("");
  };

  const cancelarEdicion = () => {
    setEditId(null);
    setEditText("");
  };

  const onEditKeyDown = (e) => {
    if (e.key === "Enter") guardarEdicion();
    if (e.key === "Escape") cancelarEdicion();
  };

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 border border-pink-100">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">
          📬 Publicaciones
        </h2>

        {/* Campo para agregar nuevo post */}
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 border border-indigo-200 rounded-xl p-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-gray-700"
            type="text"
            placeholder="Escribe tu mensaje..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && agregarPost()}
          />
          <button
            className="bg-indigo-400 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition shadow-sm"
            onClick={agregarPost}
          >
            Agregar
          </button>
        </div>

        {/* Lista de posts */}
        {post.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            No hay publicaciones aún
          </p>
        ) : (
          <ul className="space-y-4">
            {post.map((m) => {
              const enEdicion = editId === m.id;
              return (
                <li
                  key={m.id}
                  className="p-4 bg-indigo-50 rounded-xl shadow-sm border border-indigo-100 flex items-start justify-between gap-3"
                >
                  {/* Columna izquierda */}
                  <div className="flex-1">
                    {enEdicion ? (
                      <>
                        <input
                          autoFocus
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={onEditKeyDown}
                          className="w-full p-2 border border-indigo-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-300 mb-1"
                          placeholder="Editar mensaje..."
                        />
                        <small className="text-xs text-gray-500">
                          (Enter = guardar, Esc = cancelar)
                        </small>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-800 font-medium break-words">
                          {m.mensaje}
                        </p>
                        <small className="text-gray-500">
                          {new Date(m.createdAt).toLocaleString()}{" "}
                          {m.updatedAt && "· editado"}
                        </small>
                      </>
                    )}
                  </div>

                  {/* Columna derecha: acciones */}
                  <div className="flex items-center gap-2">
                    {enEdicion ? (
                      <>
                        <button
                          onClick={guardarEdicion}
                          className="text-green-600 hover:text-green-800 text-lg"
                          title="Guardar"
                        >
                          💾
                        </button>
                        <button
                          onClick={cancelarEdicion}
                          className="text-red-600 hover:text-red-800 text-lg"
                          title="Cancelar"
                        >
                          ❌
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => comenzarEdicion(m)}
                          className="text-yellow-600 hover:text-yellow-800 text-lg"
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => borrarPost(m.id)}
                          className="text-red-600 hover:text-red-800 text-lg"
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Post;
