import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PrivateLayout from "../Layouts/PrivateLayout";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({
    totalChaves: 0,
    reservasPendentes: 0,
    salasDisponiveis: 0,
    itensInventario: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDados(res.data))
      .catch((err) => {
        console.error("Erro ao carregar dashboard:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, [navigate]);

  return (
    <PrivateLayout>
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="text-2xl font-bold text-gray-800">
            Painel de Controle
          </h1>
          <p className="text-gray-600">Resumo geral da infraestrutura</p>
        </div>

        <div className="dashboard-cards">
          <Card titulo="Chaves" valor={dados.totalChaves} icone="fa-key" />
          <Card
            titulo="Reservas pendentes"
            valor={dados.reservasPendentes}
            icone="fa-clock"
          />
          <Card
            titulo="Salas disponíveis"
            valor={dados.salasDisponiveis}
            icone="fa-door-open"
          />
          <Card
            titulo="Itens no Inventário"
            valor={dados.itensInventario}
            icone="fa-boxes"
          />
        </div>

        <div className="dashboard-links">
          <button onClick={() => navigate("/dashboard/usuarios")}>
            Usuários
          </button>
          <button onClick={() => navigate("/dashboard/salas")}>Salas</button>
          <button onClick={() => navigate("/dashboard/chaves")}>Chaves</button>
          <button onClick={() => navigate("/dashboard/reservas")}>
            Reservas
          </button>
          <button onClick={() => navigate("/dashboard/itens")}>
            Inventário
          </button>
          <button onClick={() => navigate("/dashboard/instituicoes")}>
            Instituições
          </button>
          <button onClick={() => navigate("/dashboard/movimentacoes")}>
            Movimentações
          </button>
          <button onClick={() => navigate("/dashboard/logs")}>
            Logs de Uso
          </button>
        </div>
      </div>
    </PrivateLayout>
  );
}

function Card({ titulo, valor, icone }) {
  return (
    <div className="dashboard-card">
      <i className={`fas ${icone} card-icon`}></i>
      <div>
        <h2>{valor}</h2>
        <p>{titulo}</p>
      </div>
    </div>
  );
}
