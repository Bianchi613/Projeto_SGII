import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/Cadastro";
import Dashboard from "./components/Dashboard/Dashboard";
import SalasChaves from "./components/SalasChaves/SalasChaves"; // ✅ importando
import PrivateLayout from "./components/Layouts/PrivateLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Protegidas */}
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/salas-chaves" element={<SalasChaves />} /> {/* ✅ nova rota */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
