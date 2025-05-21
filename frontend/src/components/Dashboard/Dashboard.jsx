import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({
    totalChaves: 0,
    reservasPendentes: 0,
    salasDisponiveis: 0,
    itensInventario: 0,
    ultimasMovimentacoes: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const fetchDados = async () => {
      try {
        const [
          chavesRes,
          reservasRes,
          salasRes,
          itensRes,
          movimentacoesRes,
        ] = await Promise.all([
          axios.get("http://localhost:3000/chaves", { headers }),
          axios.get("http://localhost:3000/reservas", { headers }),
          axios.get("http://localhost:3000/salas", { headers }),
          axios.get("http://localhost:3000/itens-inventario", { headers }),
          axios.get("http://localhost:3000/movimentacao-chaves", { headers }),
        ]);

        const reservasPendentes = reservasRes.data.filter(
          (reserva) =>
            reserva.status === "pendente" || reserva.status === "ativa"
        ).length;

        const salasDisponiveis = salasRes.data.filter(
          (sala) => sala.disponivel === true
        ).length;

        const ultimasMovimentacoes = movimentacoesRes.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setDados({
          totalChaves: chavesRes.data.length,
          reservasPendentes,
          salasDisponiveis,
          itensInventario: itensRes.data.length,
          ultimasMovimentacoes,
        });
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchDados();
  }, [navigate]);

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1 className="text-2xl font-bold text-gray-800">Painel de Controle</h1>
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

      <div className="dashboard-section">
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Últimas movimentações de chaves
        </h2>
        <ul className="movimentacoes-list">
          {dados.ultimasMovimentacoes.map((mov, index) => (
            <li key={index} className="movimentacao-item">
              <strong>{mov.usuario?.nome || "Usuário Desconhecido"}</strong>{" "}
              — {mov.tipo} em{" "}
              <em>{new Date(mov.createdAt).toLocaleString()}</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
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
