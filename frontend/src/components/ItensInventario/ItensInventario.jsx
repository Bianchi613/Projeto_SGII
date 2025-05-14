import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ItensInventario.css";

export default function ItensInventario() {
  const [itens, setItens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/itens-inventario", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setItens(res.data))
      .catch((err) =>
        console.error("Erro ao buscar itens de inventário:", err),
      );
  }, [navigate]);

  return (
    <div className="inventario-container">
      <h1>Itens do Inventário</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Nº Patrimônio</th>
            <th>Localização</th>
            <th>Quantidade</th>
            <th>Estado</th>
            <th>Data de Aquisição</th>
            <th>Instituição</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome_item}</td>
              <td>{item.numero_patrimonio}</td>
              <td>{item.localizacao_atual}</td>
              <td>{item.quantidade}</td>
              <td>{item.estado_conservacao}</td>
              <td>{new Date(item.data_aquisicao).toLocaleDateString()}</td>
              <td>{item.instituicao?.nome || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
