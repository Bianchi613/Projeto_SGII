import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SalasChaves.css";

export default function SalasChaves() {
  const [salas, setSalas] = useState([]);
  const [chaves, setChaves] = useState([]);
  const [editSalaId, setEditSalaId] = useState(null);
  const [editChaveId, setEditChaveId] = useState(null);
  const [editSalaData, setEditSalaData] = useState(null);
  const [editChaveData, setEditChaveData] = useState(null);

  const [novaSala, setNovaSala] = useState({
    nome: "",
    tipo: "",
    capacidade: 0,
    recursos: { projetor: false, ar_condicionado: false, lousa_digital: false },
  });
  const [novaChave, setNovaChave] = useState({
    sala_id: "",
    status: "",
    observacoes: "",
  });

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchSalas();
    fetchChaves();
  }, [navigate]);

  const fetchSalas = async () => {
    try {
      const res = await axios.get("http://localhost:3000/salas", { headers });
      setSalas(res.data);
    } catch (err) {
      console.error("Erro ao buscar salas:", err);
    }
  };

  const fetchChaves = async () => {
    try {
      const res = await axios.get("http://localhost:3000/chaves", { headers });
      setChaves(res.data);
    } catch (err) {
      console.error("Erro ao buscar chaves:", err);
    }
  };

  // CRUD Salas
  const criarSala = async () => {
    try {
      await axios.post("http://localhost:3000/salas", novaSala, { headers });
      setNovaSala({
        nome: "",
        tipo: "",
        capacidade: 0,
        recursos: { projetor: false, ar_condicionado: false, lousa_digital: false },
      });
      fetchSalas();
    } catch (err) {
      console.error("Erro ao criar sala:", err);
    }
  };

  const iniciarEdicaoSala = (sala) => {
    setEditSalaId(sala.id);
    setEditSalaData({ ...sala });
  };

  const cancelarEdicaoSala = () => {
    setEditSalaId(null);
    setEditSalaData(null);
  };

  const salvarEdicaoSala = async () => {
    try {
      await axios.put(`http://localhost:3000/salas/${editSalaId}`, editSalaData, { headers });
      setEditSalaId(null);
      setEditSalaData(null);
      fetchSalas();
    } catch (err) {
      console.error("Erro ao atualizar sala:", err);
    }
  };

  const deletarSala = async (id) => {
    if (!window.confirm("Confirma exclusão da sala?")) return;
    try {
      await axios.delete(`http://localhost:3000/salas/${id}`, { headers });
      fetchSalas();
    } catch (err) {
      console.error("Erro ao deletar sala:", err);
    }
  };

  // CRUD Chaves
  const criarChave = async () => {
    try {
      await axios.post("http://localhost:3000/chaves", novaChave, { headers });
      setNovaChave({ sala_id: "", status: "", observacoes: "" });
      fetchChaves();
    } catch (err) {
      console.error("Erro ao criar chave:", err);
    }
  };

  const iniciarEdicaoChave = (chave) => {
    setEditChaveId(chave.id);
    setEditChaveData({ ...chave });
  };

  const cancelarEdicaoChave = () => {
    setEditChaveId(null);
    setEditChaveData(null);
  };

  const salvarEdicaoChave = async () => {
    try {
      await axios.put(`http://localhost:3000/chaves/${editChaveId}`, editChaveData, { headers });
      setEditChaveId(null);
      setEditChaveData(null);
      fetchChaves();
    } catch (err) {
      console.error("Erro ao atualizar chave:", err);
    }
  };

  const deletarChave = async (id) => {
    if (!window.confirm("Confirma exclusão da chave?")) return;
    try {
      await axios.delete(`http://localhost:3000/chaves/${id}`, { headers });
      fetchChaves();
    } catch (err) {
      console.error("Erro ao deletar chave:", err);
    }
  };

  return (
    <div className="salas-chaves-container">
      <h1>Salas e Chaves - SGII</h1>

      {/* Salas */}
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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {salas.map((sala) =>
              editSalaId === sala.id ? (
                <tr key={sala.id}>
                  <td>{sala.id}</td>
                  <td>
                    <input
                      type="text"
                      value={editSalaData.nome}
                      onChange={(e) =>
                        setEditSalaData({ ...editSalaData, nome: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editSalaData.tipo}
                      onChange={(e) =>
                        setEditSalaData({ ...editSalaData, tipo: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editSalaData.capacidade}
                      onChange={(e) =>
                        setEditSalaData({ ...editSalaData, capacidade: Number(e.target.value) })
                      }
                    />
                  </td>
                  <td>
                    {["projetor", "ar_condicionado", "lousa_digital"].map((recurso) => (
                      <label key={recurso} style={{ marginRight: 10 }}>
                        <input
                          type="checkbox"
                          checked={!!editSalaData.recursos?.[recurso]}
                          onChange={(e) =>
                            setEditSalaData({
                              ...editSalaData,
                              recursos: { ...editSalaData.recursos, [recurso]: e.target.checked },
                            })
                          }
                        />
                        {recurso}
                      </label>
                    ))}
                  </td>
                  <td>
                    <button onClick={salvarEdicaoSala}>Salvar</button>
                    <button onClick={cancelarEdicaoSala}>Cancelar</button>
                  </td>
                </tr>
              ) : (
                <tr key={sala.id}>
                  <td>{sala.id}</td>
                  <td>{sala.nome}</td>
                  <td>{sala.tipo}</td>
                  <td>{sala.capacidade}</td>
                  <td>
                    {Object.entries(sala.recursos || {}).map(([recurso, ativo], i) => (
                      <span key={i}>
                        {recurso}: {ativo ? "Sim" : "Não"};{" "}
                      </span>
                    ))}
                  </td>
                  <td>
                    <button onClick={() => iniciarEdicaoSala(sala)}>Editar</button>
                    <button onClick={() => deletarSala(sala.id)}>Excluir</button>
                  </td>
                </tr>
              )
            )}
            {/* Criar nova sala */}
            <tr>
              <td>Nova</td>
              <td>
                <input
                  type="text"
                  placeholder="Nome"
                  value={novaSala.nome}
                  onChange={(e) => setNovaSala({ ...novaSala, nome: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Tipo"
                  value={novaSala.tipo}
                  onChange={(e) => setNovaSala({ ...novaSala, tipo: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Capacidade"
                  value={novaSala.capacidade}
                  onChange={(e) =>
                    setNovaSala({ ...novaSala, capacidade: Number(e.target.value) })
                  }
                />
              </td>
              <td>
                {["projetor", "ar_condicionado", "lousa_digital"].map((recurso) => (
                  <label key={recurso} style={{ marginRight: 10 }}>
                    <input
                      type="checkbox"
                      checked={novaSala.recursos[recurso] || false}
                      onChange={(e) =>
                        setNovaSala({
                          ...novaSala,
                          recursos: { ...novaSala.recursos, [recurso]: e.target.checked },
                        })
                      }
                    />
                    {recurso}
                  </label>
                ))}
              </td>
              <td>
                <button onClick={criarSala}>Criar Sala</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Chaves */}
      <section className="chaves-section" style={{ marginTop: 40 }}>
        <h2>Chaves</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sala</th>
              <th>Status</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {chaves.map((chave) =>
              editChaveId === chave.id ? (
                <tr key={chave.id}>
                  <td>{chave.id}</td>
                  <td>
                    <select
                      value={editChaveData.sala_id || ""}
                      onChange={(e) =>
                        setEditChaveData({ ...editChaveData, sala_id: Number(e.target.value) })
                      }
                    >
                      <option value="">Selecione uma sala</option>
                      {salas.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.nome}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editChaveData.status || ""}
                      onChange={(e) =>
                        setEditChaveData({ ...editChaveData, status: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editChaveData.observacoes || ""}
                      onChange={(e) =>
                        setEditChaveData({ ...editChaveData, observacoes: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={salvarEdicaoChave}>Salvar</button>
                    <button onClick={cancelarEdicaoChave}>Cancelar</button>
                  </td>
                </tr>
              ) : (
                <tr key={chave.id}>
                  <td>{chave.id}</td>
                  <td>{chave.sala?.nome || "Sala não vinculada"}</td>
                  <td>{chave.status}</td>
                  <td>{chave.observacoes}</td>
                  <td>
                    <button onClick={() => iniciarEdicaoChave(chave)}>Editar</button>
                    <button onClick={() => deletarChave(chave.id)}>Excluir</button>
                  </td>
                </tr>
              )
            )}
            {/* Criar nova chave */}
            <tr>
              <td>Nova</td>
              <td>
                <select
                  value={novaChave.sala_id}
                  onChange={(e) => setNovaChave({ ...novaChave, sala_id: Number(e.target.value) })}
                >
                  <option value="">Selecione uma sala</option>
                  {salas.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Status"
                  value={novaChave.status}
                  onChange={(e) => setNovaChave({ ...novaChave, status: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Observações"
                  value={novaChave.observacoes}
                  onChange={(e) => setNovaChave({ ...novaChave, observacoes: e.target.value })}
                />
              </td>
              <td>
                <button onClick={criarChave}>Criar Chave</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}