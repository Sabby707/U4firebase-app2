import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, X } from "lucide-react";
import Modal from "../componentes/Modal";

export default function Auth({ onClose }) {
  const { login, register, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [modoRegistro, setModoRegistro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (modoRegistro && password !== confirmar) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    try {
      if (modoRegistro) await register(email, password);
      else await login(email, password);

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        onClose?.();
      }, 1800);
    } catch (err) {
      setError("⚠️ Error de autenticación.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        onClose?.();
      }, 1800);
    } catch {
      setError("No se pudo iniciar sesión con Google 😕");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gradient-to-br from-white/90 via-pink-50/90 to-indigo-50/80 
                     backdrop-blur-lg shadow-lg rounded-3xl p-8 w-full max-w-md border border-indigo-100"
        >
          {/* Cerrar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>

          {/* Encabezado */}
          <div className="text-center mb-6">
            <motion.img
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
              alt="login icon"
              className="w-16 mx-auto mb-3"
            />
            <h2 className="text-2xl font-bold text-indigo-500">
              {modoRegistro ? "Crea tu cuenta" : "Bienvenido de nuevo"}
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              {modoRegistro
                ? "Únete y comienza tu experiencia ✨"
                : "Nos alegra verte otra vez 🌼"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-rose-100 text-rose-700 border border-rose-200 px-4 py-2 rounded-md mb-3 text-sm">
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-indigo-300" size={18} />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-xl 
                           focus:ring-2 focus:ring-indigo-300 outline-none 
                           bg-white/70 placeholder-gray-400"
              />
            </div>

            {/* Contraseña */}
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-indigo-300" size={18} />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2 border rounded-xl 
                           focus:ring-2 focus:ring-indigo-300 outline-none 
                           bg-white/70 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirmar contraseña */}
            {modoRegistro && (
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-indigo-300" size={18} />
                <input
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Confirmar contraseña"
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2 border rounded-xl 
                             focus:ring-2 focus:ring-indigo-300 outline-none 
                             bg-white/70 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}

            {/* Botón principal */}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-2 rounded-xl text-white font-semibold shadow-sm transition 
                ${loading
                  ? "bg-indigo-200 cursor-not-allowed"
                  : "bg-indigo-400 hover:bg-indigo-500"}`}
            >
              {loading ? "Procesando..." : modoRegistro ? "Registrarse" : "Iniciar sesión"}
            </motion.button>
          </form>

          {/* Google */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-2 
                       bg-white border border-gray-300 hover:bg-pink-50 
                       text-gray-700 py-2 rounded-xl mt-3 transition shadow-sm"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5"
            />
            Continuar con Google
          </motion.button>

          {/* Cambiar modo */}
          <p className="text-sm text-center mt-5 text-gray-600">
            {modoRegistro ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
            <button
              onClick={() => setModoRegistro(!modoRegistro)}
              className="text-indigo-500 font-semibold hover:underline"
            >
              {modoRegistro ? "Inicia sesión" : "Crea una aquí"}
            </button>
          </p>
        </motion.div>

        {/* Modal */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div className="text-center p-4">
              <h3 className="text-2xl font-bold text-indigo-500 mb-2">🎉 ¡Bienvenido!</h3>
              <p className="text-gray-600">
                {modoRegistro
                  ? "Tu cuenta fue creada con éxito ✨"
                  : "Inicio de sesión exitoso 💫"}
              </p>
            </div>
          </Modal>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
