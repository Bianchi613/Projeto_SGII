import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./ReservaDetalhe.css";

export default function ReservaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const res = await api.get(`/reservas/${id}`);
        setReserva(res.data);
      } catch (err) {
        console.error("Erro ao buscar reserva:", err);
        alert("Erro ao carregar a reserva.");
        navigate("/dashboard");
      }
    };
    fetchReserva();
  }, [id, navigate]);

  const handleChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/reservas/${id}`, reserva);
      alert("Reserva atualizada com sucesso!");
      navigate(-1);
    } catch (err) {
      console.error("Erro ao atualizar reserva:", err);
      alert("Erro ao atualizar.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir esta reserva?")) return;
    try {
      await api.delete(`/reservas/${id}`);
      alert("Reserva excluída.");
      navigate(-1);
    } catch (err) {
      console.error("Erro ao excluir reserva:", err);
      alert("Erro ao excluir.");
    }
  };

  if (!reserva) return <p>Carregando...</p>;

  return (
    <div className="reserva-detalhe-container">
      <h1>Detalhes da Reserva #{reserva.id}</h1>
      <form className="reserva-form" onSubmit={(e) => e.preventDefault()}>
        <label>Usuário ID</label>
        <input
          type="number"
          name="usuarioId"
          value={reserva.usuarioId}
          onChange={handleChange}
        />

        <label>Sala ID</label>
        <input
          type="number"
          name="salaId"
          value={reserva.salaId}
          onChange={handleChange}
        />

        <label>Data Início</label>
        <input
          type="datetime-local"
          name="data_inicio"
          value={reserva.data_inicio?.slice(0, 16)}
          onChange={handleChange}
        />

        <label>Data Fim</label>
        <input
          type="datetime-local"
          name="data_fim"
          value={reserva.data_fim?.slice(0, 16)}
          onChange={handleChange}
        />

        <label>Finalidade</label>
        <input
          type="text"
          name="finalidade"
          value={reserva.finalidade}
          onChange={handleChange}
        />

        <label>Status</label>
        <select name="status" value={reserva.status} onChange={handleChange}>
          <option value="ativa">Ativa</option>
          <option value="pendente">Pendente</option>
          <option value="cancelada">Cancelada</option>
        </select>

        <div className="reserva-form-actions">
          <button type="button" onClick={handleUpdate}>
            Salvar
          </button>
          <button type="button" onClick={handleDelete} className="delete">
            Excluir
          </button>
        </div>
      </form>
    </div>
  );
}
