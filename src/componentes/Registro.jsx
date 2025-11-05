import { useState } from "react";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function Registro() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  // Registrar con correo y contraseña
  const handleRegistro = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    try {
      await createUserWithEmailAndPassword(auth, correo, contraseña);
      setExito("¡Cuenta creada exitosamente!");
      setCorreo("");
      setContraseña("");
    } catch (err) {
      setError(traducirError(err.code));
    }
  };

  // Registrar o iniciar sesión con Google
  const handleGoogle = async () => {
    setError("");
    setExito("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setExito("¡Has iniciado sesión con Google!");
    } catch (err) {
      setError(traducirError(err.code));
    }
  };

  // Traducción de errores
  function traducirError(code) {
    switch (code) {
      case "auth/email-already-in-use":
        return "Este correo ya está registrado.";
      case "auth/invalid-email":
        return "El correo no es válido.";
      case "auth/weak-password":
        return "La contraseña es muy débil (mínimo 6 caracteres).";
      case "auth/popup-closed-by-user":
        return "El inicio con Google fue cancelado.";
      default:
        return "Ocurrió un error. Intenta nuevamente.";
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-purple-100">
        <h1 className="text-3xl font-semibold text-center text-purple-700 mb-6">
          Crear cuenta
        </h1>

        <form onSubmit={handleRegistro} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition font-medium"
          >
            Registrarme
          </button>
        </form>

        <div className="my-6 text-center text-gray-500 text-sm">o</div>

        <button
          onClick={handleGoogle}
          className="w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition font-medium flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          Continuar con Google
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {exito && <p className="text-green-500 mt-4 text-center">{exito}</p>}
      </div>
    </div>
  );
}
