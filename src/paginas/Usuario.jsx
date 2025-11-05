import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  onSnapshot,
  query,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export function Usuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [formUsuario, setFormUsuario] = useState({
    nombre: "",
    correo: "",
    edad: "",
    telefono: "",
    rol: "",
  });
  const [editId, setEditId] = useState(null);
  const [editUsuario, setEditUsuario] = useState({
    nombre: "",
    correo: "",
    edad: "",
    telefono: "",
    rol: "",
  });

  // 🔹 Cargar usuarios en tiempo real
  useEffect(() => {
    const consulta = query(collection(db, "usuario"));
    const unsubscribe = onSnapshot(consulta, (snapshot) => {
      const docs = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setUsuarios(docs);
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Manejo genérico de inputs
  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    // 🔸 Asegurar que no haya undefined y siempre sea string
    setter((prev) => ({ ...prev, [name]: value ?? "" }));
  };

  // 🔹 Validación básica
  const camposCompletos = (data) =>
    Object.values(data).every((val) => String(val).trim() !== "");

  // 🔹 Agregar usuario nuevo
  const guardarUsuario = async () => {
    if (!camposCompletos(formUsuario))
      return alert("⚠️ Completa todos los campos antes de agregar.");

    const nuevoUsuario = {
      ...formUsuario,
      edad: Number(formUsuario.edad),
      createdAt: new Date(),
    };

    await addDoc(collection(db, "usuario"), nuevoUsuario);

    setFormUsuario({
      nombre: "",
      correo: "",
      edad: "",
      telefono: "",
      rol: "",
    });
  };

  // 🔹 Borrar usuario
  const borrarUsuario = async (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmar) return;
    await deleteDoc(doc(db, "usuario", id));
  };

  // 🔹 Comenzar edición
  const comenzarEdicion = (usuario) => {
    setEditId(usuario.id);
    setEditUsuario({
      nombre: usuario.nombre || "",
      correo: usuario.correo || "",
      edad: usuario.edad?.toString() || "",
      telefono: usuario.telefono || "",
      rol: usuario.rol || "",
    });
  };

  // 🔹 Guardar cambios de edición
  const guardarEdicion = async () => {
    if (!editId) return;
    if (!camposCompletos(editUsuario))
      return alert("⚠️ Completa todos los campos antes de guardar.");

    await updateDoc(doc(db, "usuario", editId), {
      ...editUsuario,
      edad: Number(editUsuario.edad),
      updatedAt: new Date(),
    });

    cancelarEdicion();
  };

  // 🔹 Cancelar edición
  const cancelarEdicion = () => {
    setEditId(null);
    setEditUsuario({
      nombre: "",
      correo: "",
      edad: "",
      telefono: "",
      rol: "",
    });
  };

  // 🔹 Atajos con teclado (Enter / Escape)
  const onEditKeyDown = (e) => {
    if (e.key === "Enter") guardarEdicion();
    if (e.key === "Escape") cancelarEdicion();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-6 border border-lavender-200">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">
        Gestión de Usuarios
      </h2>

      {/* Formulario para agregar usuario */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {["nombre", "correo", "edad", "telefono", "rol"].map((campo) => (
          <input
            key={campo}
            name={campo}
            type={campo === "edad" ? "number" : "text"}
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
            value={formUsuario[campo]}
            onChange={handleChange(setFormUsuario)}
            className="border border-indigo-200 rounded-xl p-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none w-40 text-gray-700"
          />
        ))}
        <button
          onClick={guardarUsuario}
          className="bg-indigo-400 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition shadow-sm"
        >
          Agregar
        </button>
      </div>

      {/* Lista de usuarios */}
      {usuarios.length === 0 ? (
        <p className="text-gray-500 text-center italic">
          No hay usuarios registrados
        </p>
      ) : (
        <ul className="space-y-4">
          {usuarios.map((u) => {
            const enEdicion = editId === u.id;
            return (
              <li
                key={u.id}
                className="flex justify-between items-start bg-indigo-50 rounded-xl p-4 shadow-sm border border-indigo-100"
              >
                <div className="flex-1">
                  {enEdicion ? (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {["nombre", "correo", "edad", "telefono", "rol"].map(
                        (campo) => (
                          <input
                            key={campo}
                            name={campo}
                            type={campo === "edad" ? "number" : "text"}
                            placeholder={`Editar ${campo}...`}
                            value={editUsuario[campo]}
                            onChange={handleChange(setEditUsuario)}
                            onKeyDown={onEditKeyDown}
                            className="border border-indigo-200 rounded-lg p-1 text-sm focus:ring-2 focus:ring-indigo-300 w-28"
                          />
                        )
                      )}
                      <small className="text-gray-500 w-full text-xs">
                        (Enter = guardar, Esc = cancelar)
                      </small>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-700">
                      <strong className="text-indigo-600">{u.nombre}</strong>{" "}
                      <span className="text-gray-500">({u.rol})</span>
                      <div>{u.correo}</div>
                      <div>Edad: {u.edad}</div>
                      <div>Tel: {u.telefono}</div>
                      {u.updatedAt && (
                        <small className="text-gray-400 italic">· editado</small>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-2">
                  {enEdicion ? (
                    <>
                      <button
                        onClick={guardarEdicion}
                        className="text-green-600 hover:text-green-800 text-lg"
                      >
                        💾
                      </button>
                      <button
                        onClick={cancelarEdicion}
                        className="text-red-600 hover:text-red-800 text-lg"
                      >
                        ❌
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => comenzarEdicion(u)}
                        className="text-yellow-600 hover:text-yellow-800 text-lg"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => borrarUsuario(u.id)}
                        className="text-red-600 hover:text-red-800 text-lg"
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
  );
}
