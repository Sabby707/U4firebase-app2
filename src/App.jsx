import { Routes, Route } from "react-router-dom";
import Navbar from "./componentes/navbar";
import Post from "./paginas/post";
import { Usuario } from "./paginas/Usuario";
import { Productos } from "./paginas/productos";
import { Inicio } from "./paginas/incio";
import Modal from "./componentes/Modal";
import Auth from "./componentes/Auth";
import { useState } from "react";

function App() {
  // Estado para manejar el modal de autenticación
  const [authModalAbierto, setAuthModalAbierto] = useState(false);

  // Abrir y cerrar modal
  const abrirAuth = () => setAuthModalAbierto(true);
  const cerrarAuth = () => setAuthModalAbierto(false);

  return (
    <>
      {/* 🔹 Navbar siempre visible */}
      <Navbar abrirAuth={abrirAuth} />

      {/* 🔹 Rutas normales */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/usuarios" element={<Usuario />} />
        <Route path="/post" element={<Post />} />
        <Route path="/productos" element={<Productos />} />
      </Routes>

      {/* 🔹 Modal de autenticación */}
      {authModalAbierto && (
        <Modal onClose={cerrarAuth}>
          <Auth onClose={cerrarAuth} />
        </Modal>
      )}
    </>
  );
}

export default App;
