// src/components/ReservasMovimentacoes/ReservasMovimentacoes.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ReservasMovimentacoes.css";

export default function ReservasMovimentacoes() {
  const [reservas, setReservas] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios
      .get("http://localhost:3000/reservas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setReservas(res.data))
      .catch((err) => console.error("Erro ao buscar reservas:", err));

    axios
      .get("http://localhost:3000/movimentacao-chaves", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMovimentacoes(res.data))
      .catch((err) => console.error("Erro ao buscar movimentações:", err));
  }, [navigate]);

  return (
    <div className="reservas-mov-container">
      <h1>Reservas e Movimentações</h1>

      <section className="reservas-section">
        <h2>Reservas</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuário</th>
              <th>Sala</th>
              <th>Início</th>
              <th>Fim</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.usuario?.nome}</td>
                <td>{reserva.sala?.nome}</td>
                <td>{new Date(reserva.data_inicio).toLocaleString()}</td>
                <td>{new Date(reserva.data_fim).toLocaleString()}</td>
                <td>{reserva.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="movimentacoes-section">
        <h2>Movimentações de Chaves</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Chave</th>
              <th>Retirada</th>
              <th>Devolução</th>
              <th>Usuário</th>
              <th>Observações</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((mov) => (
              <tr key={mov.id}>
                <td>{mov.id}</td>
                <td>{mov.chave?.sala?.nome || "Chave sem sala"}</td>
                <td>{new Date(mov.data_retirada).toLocaleString()}</td>
                <td>
                  {mov.data_devolucao
                    ? new Date(mov.data_devolucao).toLocaleString()
                    : "-"}
                </td>
                <td>{mov.usuario?.nome}</td>
                <td>{mov.observacoes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
