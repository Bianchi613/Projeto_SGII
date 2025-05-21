import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NovaReserva.css"; // Importação do CSS

export default function NovaReserva() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    usuarioId: 1,
    salaId: 1,
    data_inicio: "2025-04-20T10:00:00",
    data_fim: "2025-04-20T12:00:00",
    finalidade: "Reunião da equipe de TI",
    status: "ativa",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:3000/reservas", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Reserva criada com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      alert("Erro ao criar reserva.");
    }
  };

  return (
    <div className="nova-reserva-container">
      <h1 className="nova-reserva-titulo">Nova Reserva</h1>
      <form onSubmit={handleSubmit} className="nova-reserva-form">
        <div>
          <label>Usuário ID</label>
          <input
            type="number"
            name="usuarioId"
            value={form.usuarioId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sala ID</label>
          <input
            type="number"
            name="salaId"
            value={form.salaId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Data Início</label>
          <input
            type="datetime-local"
            name="data_inicio"
            value={form.data_inicio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Data Fim</label>
          <input
            type="datetime-local"
            name="data_fim"
            value={form.data_fim}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Finalidade</label>
          <input
            type="text"
            name="finalidade"
            value={form.finalidade}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="ativa">Ativa</option>
            <option value="pendente">Pendente</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        <button type="submit" className="nova-reserva-botao">
          Criar Reserva
        </button>
      </form>
    </div>
  );
}
