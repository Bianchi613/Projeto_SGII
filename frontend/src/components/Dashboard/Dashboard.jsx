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
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch real data from the API
    axios
      .get("/api/dashboard-data", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDados(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>SGII - Painel de Controle</h1>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Sair
        </button>
      </header>

      <section className="dashboard-cards">
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
      </section>

      <section className="dashboard-links">
        <button onClick={() => navigate("/dashboard/usuarios")}>
          Usuários
        </button>
        <button onClick={() => navigate("/dashboard/salas")}>Salas</button>
        <button onClick={() => navigate("/dashboard/chaves")}>Chaves</button>
        <button onClick={() => navigate("/dashboard/reservas")}>
          Reservas
        </button>
        <button onClick={() => navigate("/dashboard/itens")}>Inventário</button>
        <button onClick={() => navigate("/dashboard/instituicoes")}>
          Instituições
        </button>
        <button onClick={() => navigate("/dashboard/movimentacoes")}>
          Movimentações
        </button>
        <button onClick={() => navigate("/dashboard/logs")}>Logs de Uso</button>
      </section>
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
