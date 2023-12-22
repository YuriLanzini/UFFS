import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdcCliente from "./AdcCliente";
import Login from "./Login";
import Bebidas from "./Bebidas";
import Carrinho from "./Carrinho";
import Pedido from "./Pedido";
import TelaAdm from "./TelaAdm";
import AdcProduto from "./AdcProduto";
import AdcAdm from "./AdcAdm";
import Estoque from "./Estoque";
import Vendas from "./Vendas";
import ClientesDebito from "./ClientesDebito";
import PagarDebito from "./PagarDebito";
import { Box } from "@mui/material";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      const role = localStorage.getItem("Tipo");
      setUserRole(role);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Tipo");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  // useEffect(() => {
  //   handleLogin();
  // }, []);

  const isUserAdmin = () => {
    return userRole === "Admin";
  };

  return (
    <Router>
      <Box>
        {isLoggedIn ? (
          <Routes>
            <Route path="/adcCliente" element={<AdcCliente />} />
            <Route
              path="/bebidas"
              element={<Bebidas onLogout={handleLogout} />}
            />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/pagardebito" element={<PagarDebito />} />
            <Route path="/pedido" element={<Pedido />} />

            {isUserAdmin() && (
              <>
                <Route
                  path="/adm"
                  element={<TelaAdm onLogout={handleLogout} />}
                />
                <Route path="/adcProduto" element={<AdcProduto />} />
                <Route path="/adcAdm" element={<AdcAdm />} />
                <Route path="/estoque" element={<Estoque />} />
                <Route path="/vendas" element={<Vendas />} />
                <Route path="/debito" element={<ClientesDebito />} />
              </>
            )}
          </Routes>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </Box>
    </Router>
  );
}

export default App;
