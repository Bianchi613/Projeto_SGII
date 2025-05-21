import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/Cadastro";
import Dashboard from "./components/Dashboard/Dashboard";
import SalasChaves from "./components/SalasChaves/SalasChaves";
import ItensInventario from "./components/ItensInventario/ItensInventario";
import ReservasMovimentacoes from "./components/ReservasMovimentacoes/ReservasMovimentacoes";
import Instituicoes from "./components/Instituicao/Instituicao";
import Configuracoes from "./components/Configuracoes/Configuracoes";
import PrivateLayout from "./components/Layouts/PrivateLayout";
import NovaReserva from "./components/NovaReserva/NovaReserva";
import ReservaDetalhe from "./components/ReservaDetalhe/ReservaDetalhe";
import EsqueciSenha from "./components/EsqueciSenha/EsqueciSenha"; // ✅ nova importação

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} /> {/* ✅ nova rota */}

        {/* Protegidas */}
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/salas-chaves" element={<SalasChaves />} />
          <Route path="/dashboard/itens-inventario" element={<ItensInventario />} />
          <Route path="/dashboard/reservas-movimentacoes" element={<ReservasMovimentacoes />} />
          <Route path="/dashboard/instituicao" element={<Instituicoes />} />
          <Route path="/dashboard/configuracoes" element={<Configuracoes />} />
          <Route path="/dashboard/reservas/novo" element={<NovaReserva />} />
          <Route path="/dashboard/reservas/:id" element={<ReservaDetalhe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
