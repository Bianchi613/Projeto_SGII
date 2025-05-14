import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SalasChaves.css";

export default function SalasChaves() {
  const [salas, setSalas] = useState([]);
  const [chaves, setChaves] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/salas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSalas(res.data))
      .catch((err) => console.error("Erro ao buscar salas:", err));

    axios
      .get("http://localhost:3000/chaves", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setChaves(res.data))
      .catch((err) => console.error("Erro ao buscar chaves:", err));
  }, [navigate]);

  return (
    <div className="salas-chaves-container">
      <h1>Salas e Chaves</h1>

      <section className="salas-section">
        <h2>Salas</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Capacidade</th>
              <th>Recursos</th>
            </tr>
          </thead>
          <tbody>
            {salas.map((sala) => (
              <tr key={sala.id}>
                <td>{sala.id}</td>
                <td>{sala.nome}</td>
                <td>{sala.tipo}</td>
                <td>{sala.capacidade}</td>
                <td>
                  {Object.entries(sala.recursos || {}).map(
                    ([recurso, ativo], index) => (
                      <span key={index}>
                        {recurso}: {ativo ? "Sim" : "Não"};{" "}
                      </span>
                    ),
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="chaves-section">
        <h2>Chaves</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sala</th>
              <th>Status</th>
              <th>Observações</th>
            </tr>
          </thead>
          <tbody>
            {chaves.map((chave) => (
              <tr key={chave.id}>
                <td>{chave.id}</td>
                <td>{chave.sala?.nome || "Sala não vinculada"}</td>
                <td>{chave.status}</td>
                <td>{chave.observacoes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
