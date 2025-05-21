import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({
    totalChaves: 0,
    reservasPendentes: 0,
    reservasAtivas: [], // para mostrar reservas ativas e pendentes detalhadas
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

    async function fetchDados() {
      try {
        const [chavesRes, reservasRes, salasRes, itensRes, movimentacoesRes] =
          await Promise.all([
            axios.get("http://localhost:3000/chaves", { headers }),
            axios.get("http://localhost:3000/reservas", { headers }),
            axios.get("http://localhost:3000/salas", { headers }),
            axios.get("http://localhost:3000/itens-inventario", { headers }),
            axios.get("http://localhost:3000/movimentacao-chaves", { headers }),
          ]);

        const reservasArray = Array.isArray(reservasRes.data)
          ? reservasRes.data
          : reservasRes.data?.data || [];

        // Filtra reservas com status "pendente" ou "ativa"
        const reservasAtivasPendentes = reservasArray.filter((reserva) => {
          const status = (reserva.status || "").toLowerCase();
          return (
            status === "pendente" || status === "ativa" || status === "ativo"
          );
        });

        setDados({
          totalChaves: chavesRes.data.length,
          reservasPendentes: reservasAtivasPendentes.length,
          reservasAtivas: reservasAtivasPendentes,
          salasDisponiveis: salasRes.data.filter((sala) => sala.disponivel)
            .length,
          itensInventario: itensRes.data.length,
          ultimasMovimentacoes: movimentacoesRes.data
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5),
        });
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    }
    fetchDados();
  }, [navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Painel de Controle</h1>
        <p className="text-gray-600">Resumo geral da infraestrutura</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          titulo="Chaves"
          valor={dados.totalChaves}
          icone="fa-key"
          cor="blue"
        />
        <Card
          titulo="Reservas pendentes"
          valor={dados.reservasPendentes}
          icone="fa-clock"
          cor="yellow"
        />
        <Card
          titulo="Salas disponíveis"
          valor={dados.salasDisponiveis}
          icone="fa-door-open"
          cor="green"
        />
        <Card
          titulo="Itens no Inventário"
          valor={dados.itensInventario}
          icone="fa-boxes"
          cor="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reservas ativas/pendentes */}
        <section className="bg-white rounded-lg shadow overflow-auto">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Reservas ativas/pendentes
            </h3>
            <button
              onClick={() => navigate("/dashboard/reservas/novo")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              title="Criar nova reserva"
            >
              <i className="fas fa-plus mr-2"></i> Nova Reserva
            </button>
          </div>
          {dados.reservasAtivas.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <i className="fas fa-calendar-check text-4xl mb-3"></i>
              <p className="text-lg font-medium">
                Nenhuma reserva ativa ou pendente
              </p>
              <p className="mt-1 text-sm">
                Não há reservas ativas ou pendentes no momento.
              </p>
            </div>
          ) : (
            <table className="styled-table w-full text-left text-sm text-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Usuário</th>
                  <th className="px-4 py-2">Sala</th>
                  <th className="px-4 py-2">Início</th>
                  <th className="px-4 py-2">Fim</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {dados.reservasAtivas.map((reserva) => (
                  <tr
                    key={reserva.id}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="px-4 py-2">{reserva.id}</td>
                    <td className="px-4 py-2">
                      {reserva.usuario?.nome || "Sem usuário"}
                    </td>
                    <td className="px-4 py-2">
                      {reserva.sala?.nome || "Sem sala"}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(reserva.data_inicio).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(reserva.data_fim).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 capitalize">{reserva.status}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/reservas/${reserva.id}`)
                        }
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Últimas movimentações */}
        <section className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Últimas movimentações
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {dados.ultimasMovimentacoes.map((mov, index) => (
              <div key={index} className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 rounded-full bg-gray-100 text-gray-600">
                    <i className="fas fa-exchange-alt"></i>
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        {mov.tipo}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {new Date(mov.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {mov.usuario?.nome || "Usuário Desconhecido"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Card({ titulo, valor, icone, cor }) {
  return (
    <div
      className={`bg-white rounded-lg shadow p-6 transition duration-300 ease-in-out transform hover:-translate-y-1`}
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-full bg-${cor}-100 text-${cor}-600`}>
          <i className={`fas ${icone} text-xl`}></i>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{titulo}</p>
          <p className="text-2xl font-semibold text-gray-800">{valor}</p>
        </div>
      </div>
    </div>
  );
}
