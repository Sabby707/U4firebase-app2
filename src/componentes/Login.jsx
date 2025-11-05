import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  // Cargar funciones del contexto
  const { login, resetPassword, loginWithGoogle } = useAuth();

  // Estados de formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados para mensajes
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // --- Función para iniciar sesión ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      await login(email, password);
      setMensaje("✅ Inicio de sesión exitoso");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError("❌ Error al iniciar sesión. Revisa tus credenciales.");
    }
  };

  // --- Función para restablecer contraseña ---
  const handleReset = async () => {
    setError("");
    setMensaje("");

    if (!email) {
      setError("Por favor, escribe tu correo para restablecer la contraseña.");
      return;
    }

    try {
      await resetPassword(email);
      setMensaje("📧 Se ha enviado un correo para restablecer tu contraseña.");
    } catch (err) {
      console.error(err);
      setError("No se pudo enviar el correo de recuperación.");
    }
  };

  // --- Función para iniciar sesión con Google ---
  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      setMensaje("🎉 Inicio de sesión con Google exitoso");
    } catch (err) {
      console.error(err);
      setError("No se pudo iniciar sesión con Google.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Iniciar sesión
        </h1>

        {/* Mensajes */}
        {error && (
          <p className="mb-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </p>
        )}
        {mensaje && (
          <p className="mb-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded p-2">
            {mensaje}
          </p>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            Entrar
          </button>
        </form>

        {/* Acciones extra */}
        <div className="mt-3 flex justify-between items-center text-sm">
          <button
            type="button"
            onClick={handleReset}
            className="text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>

          <button
            type="button"
            onClick={handleGoogle}
            className="text-slate-700 border px-2 py-1 rounded-lg hover:bg-slate-50"
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
}
