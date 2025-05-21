import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ReservasMovimentacoes.css";

export default function ReservasMovimentacoes() {
  const [reservas, setReservas] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [formReserva, setFormReserva] = useState(null); // null = sem form aberto, obj = edição/novo
  const [formMovimentacao, setFormMovimentacao] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchReservas();
    fetchMovimentacoes();
  }, [navigate, token]);

  // Fetch reservas
  const fetchReservas = async () => {
    try {
      const res = await axios.get("http://localhost:3000/reservas", { headers });
      setReservas(res.data);
    } catch (err) {
      console.error("Erro ao buscar reservas:", err);
    }
  };

  // Fetch movimentações
  const fetchMovimentacoes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/movimentacao-chaves", { headers });
      setMovimentacoes(res.data);
    } catch (err) {
      console.error("Erro ao buscar movimentações:", err);
    }
  };

  // Deletar reserva
  const deleteReserva = async (id) => {
    if (!window.confirm("Confirma a exclusão desta reserva?")) return;
    try {
      await axios.delete(`http://localhost:3000/reservas/${id}`, { headers });
      fetchReservas();
    } catch (err) {
      console.error("Erro ao deletar reserva:", err);
    }
  };

  // Deletar movimentação
  const deleteMovimentacao = async (id) => {
    if (!window.confirm("Confirma a exclusão desta movimentação?")) return;
    try {
      await axios.delete(`http://localhost:3000/movimentacao-chaves/${id}`, { headers });
      fetchMovimentacoes();
    } catch (err) {
      console.error("Erro ao deletar movimentação:", err);
    }
  };

  // Salvar reserva (novo ou editar)
  const saveReserva = async (e) => {
    e.preventDefault();
    try {
      if (formReserva.id) {
        await axios.put(`http://localhost:3000/reservas/${formReserva.id}`, formReserva, { headers });
      } else {
        await axios.post(`http://localhost:3000/reservas`, formReserva, { headers });
      }
      setFormReserva(null);
      fetchReservas();
    } catch (err) {
      console.error("Erro ao salvar reserva:", err);
    }
  };

  // Salvar movimentação
  const saveMovimentacao = async (e) => {
    e.preventDefault();
    try {
      if (formMovimentacao.id) {
        await axios.put(`http://localhost:3000/movimentacao-chaves/${formMovimentacao.id}`, formMovimentacao, { headers });
      } else {
        await axios.post(`http://localhost:3000/movimentacao-chaves`, formMovimentacao, { headers });
      }
      setFormMovimentacao(null);
      fetchMovimentacoes();
    } catch (err) {
      console.error("Erro ao salvar movimentação:", err);
    }
  };

  // Render form reserva
  const renderReservaForm = () => (
    <form onSubmit={saveReserva} className="form-container">
      <h3>{formReserva.id ? "Editar Reserva" : "Nova Reserva"}</h3>
      <label>
        Usuário ID:
        <input
          type="number"
          value={formReserva.usuarioId || ""}
          onChange={(e) => setFormReserva({ ...formReserva, usuarioId: parseInt(e.target.value) })}
          required
        />
      </label>
      <label>
        Sala ID:
        <input
          type="number"
          value={formReserva.salaId || ""}
          onChange={(e) => setFormReserva({ ...formReserva, salaId: parseInt(e.target.value) })}
          required
        />
      </label>
      <label>
        Data Início:
        <input
          type="datetime-local"
          value={formReserva.data_inicio ? formReserva.data_inicio.substring(0,16) : ""}
          onChange={(e) => setFormReserva({ ...formReserva, data_inicio: e.target.value })}
          required
        />
      </label>
      <label>
        Data Fim:
        <input
          type="datetime-local"
          value={formReserva.data_fim ? formReserva.data_fim.substring(0,16) : ""}
          onChange={(e) => setFormReserva({ ...formReserva, data_fim: e.target.value })}
          required
        />
      </label>
      <label>
        Finalidade:
        <input
          type="text"
          value={formReserva.finalidade || ""}
          onChange={(e) => setFormReserva({ ...formReserva, finalidade: e.target.value })}
          required
        />
      </label>
      <label>
        Status:
        <select
          value={formReserva.status || ""}
          onChange={(e) => setFormReserva({ ...formReserva, status: e.target.value })}
          required
        >
          <option value="">Selecione</option>
          <option value="pendente">Pendente</option>
          <option value="ativa">Ativa</option>
          <option value="cancelada">Cancelada</option>
          <option value="finalizada">Finalizada</option>
        </select>
      </label>
      <div className="form-actions">
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => setFormReserva(null)}>Cancelar</button>
      </div>
    </form>
  );

  // Render form movimentação
  const renderMovimentacaoForm = () => (
    <form onSubmit={saveMovimentacao} className="form-container">
      <h3>{formMovimentacao.id ? "Editar Movimentação" : "Nova Movimentação"}</h3>
      <label>
        Chave ID:
        <input
          type="number"
          value={formMovimentacao.chaveId || ""}
          onChange={(e) => setFormMovimentacao({ ...formMovimentacao, chaveId: parseInt(e.target.value) })}
          required
        />
      </label>
      <label>
        Usuário ID:
        <input
          type="number"
          value={formMovimentacao.usuarioId || ""}
          onChange={(e) => setFormMovimentacao({ ...formMovimentacao, usuarioId: parseInt(e.target.value) })}
          required
        />
      </label>
      <label>
        Data Retirada:
        <input
          type="datetime-local"
          value={formMovimentacao.data_retirada ? formMovimentacao.data_retirada.substring(0,16) : ""}
          onChange={(e) => setFormMovimentacao({ ...formMovimentacao, data_retirada: e.target.value })}
          required
        />
      </label>
      <label>
        Data Devolução:
        <input
          type="datetime-local"
          value={formMovimentacao.data_devolucao ? formMovimentacao.data_devolucao.substring(0,16) : ""}
          onChange={(e) => setFormMovimentacao({ ...formMovimentacao, data_devolucao: e.target.value })}
        />
      </label>
      <label>
        Responsável Entrega (ID):
        <input
          type="number"
          value={formMovimentacao.responsavel_entrega || ""}
          onChange={(e) => setFormMovimentacao({ ...formMovimentacao, responsavel_entrega: parseInt(e.target.value) })}
          required
        />
      </label>
      <label>
        Responsável Recebimento (ID):
        <input
          type="number"
          value={formMovimentacao.responsavel_recebimento || ""}
          onChange={(e) => setFormMovimentacao({ ...formMovimentacao, responsavel_recebimento: parseInt(e.target.value) })}
          required
        />
      </label>
      <label>
        Observações:
        <textarea
          value={formMovimentacao.observacoes || ""}
          onChange={(e) => setFormMovimentacao({ ...formMovimentacao, observacoes: e.target.value })}
        />
      </label>
      <div className="form-actions">
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => setFormMovimentacao(null)}>Cancelar</button>
      </div>
    </form>
  );

  return (
    <div className="reservas-mov-container">
      <h1>Reservas e Movimentações</h1>

      <section className="reservas-section">
        <div className="section-header">
          <h2>Reservas</h2>
          <button onClick={() => setFormReserva({})} className="btn btn-primary">Nova Reserva</button>
        </div>

        {formReserva ? renderReservaForm() : (
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuário</th>
                <th>Sala</th>
                <th>Início</th>
                <th>Fim</th>
                <th>Status</th>
                <th>Ações</th>
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
                  <td>
                    <button onClick={() => setFormReserva(reserva)} className="btn btn-edit">Editar</button>
                    <button onClick={() => deleteReserva(reserva.id)} className="btn btn-delete">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="movimentacoes-section">
        <div className="section-header">
          <h2>Movimentações de Chaves</h2>
          <button onClick={() => setFormMovimentacao({})} className="btn btn-primary">Nova Movimentação</button>
        </div>

        {formMovimentacao ? renderMovimentacaoForm() : (
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Chave</th>
                <th>Retirada</th>
                <th>Devolução</th>
                <th>Usuário</th>
                <th>Observações</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {movimentacoes.map((mov) => (
                <tr key={mov.id}>
                  <td>{mov.id}</td>
                  <td>{mov.chave?.sala?.nome || "Chave sem sala"}</td>
                  <td>{new Date(mov.data_retirada).toLocaleString()}</td>
                  <td>{mov.data_devolucao ? new Date(mov.data_devolucao).toLocaleString() : "-"}</td>
                  <td>{mov.usuario?.nome}</td>
                  <td>{mov.observacoes}</td>
                  <td>
                    <button onClick={() => setFormMovimentacao(mov)} className="btn btn-edit">Editar</button>
                    <button onClick={() => deleteMovimentacao(mov.id)} className="btn btn-delete">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
