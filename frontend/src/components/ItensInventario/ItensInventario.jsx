import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import "./ItensInventario.css";

const API_URL = "/itens-inventario";

export default function ItensInventario() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formMode, setFormMode] = useState("list"); // "list" ou "edit" ou "create"
  const [formData, setFormData] = useState({
    id: null,
    nome_item: "",
    descricao: "",
    numero_patrimonio: "",
    localizacao_atual: "",
    quantidade: 1,
    estado_conservacao: "",
    data_aquisicao: "",
    instituicaoId: "",
  });
  const [instituicoes, setInstituicoes] = useState([]);

  // Busca lista de itens e instituições
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [itensRes, instRes] = await Promise.all([
        api.get(API_URL),
        api.get("/instituicoes"),
      ]);
      setItens(itensRes.data);
      setInstituicoes(instRes.data);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Manipula mudanças nos inputs do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  // Salvar novo item ou atualizar existente
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === "create") {
        await api.post(API_URL, formData);
      } else if (formMode === "edit") {
        await api.put(`${API_URL}/${formData.id}`, formData);
      }
      setFormMode("list");
      fetchData();
    } catch (err) {
      console.error("Erro ao salvar item:", err);
    }
  };

  // Editar item - preenche formulário
  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      nome_item: item.nome_item,
      descricao: item.descricao || "",
      numero_patrimonio: item.numero_patrimonio,
      localizacao_atual: item.localizacao_atual,
      quantidade: item.quantidade,
      estado_conservacao: item.estado_conservacao,
      data_aquisicao: item.data_aquisicao.slice(0, 10), // formato yyyy-mm-dd
      instituicaoId: item.instituicaoId,
    });
    setFormMode("edit");
  };

  // Deletar item
  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este item?")) return;
    try {
      await api.delete(`${API_URL}/${id}`);
      fetchData();
    } catch (err) {
      console.error("Erro ao deletar item:", err);
    }
  };

  if (loading) return <p>Carregando...</p>;

  if (formMode === "list")
    return (
      <div className="inventario-container">
        <h1>Itens do Inventário</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setFormData({
              id: null,
              nome_item: "",
              descricao: "",
              numero_patrimonio: "",
              localizacao_atual: "",
              quantidade: 1,
              estado_conservacao: "",
              data_aquisicao: "",
              instituicaoId: "",
            });
            setFormMode("create");
          }}
        >
          + Novo Item
        </button>
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
              <th>Ações</th>
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
                <td>
                  <button onClick={() => handleEdit(item)}>Editar</button>
                  <button onClick={() => handleDelete(item.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  return (
    <div className="inventario-container">
      <h1>{formMode === "create" ? "Novo Item" : "Editar Item"}</h1>
      <form onSubmit={handleSubmit} className="form-inventario">
        <label>
          Nome:
          <input
            type="text"
            name="nome_item"
            value={formData.nome_item}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Descrição:
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Nº Patrimônio:
          <input
            type="text"
            name="numero_patrimonio"
            value={formData.numero_patrimonio}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Localização Atual:
          <input
            type="text"
            name="localizacao_atual"
            value={formData.localizacao_atual}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Quantidade:
          <input
            type="number"
            name="quantidade"
            value={formData.quantidade}
            onChange={handleInputChange}
            min={1}
            required
          />
        </label>
        <label>
          Estado de Conservação:
          <input
            type="text"
            name="estado_conservacao"
            value={formData.estado_conservacao}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Data de Aquisição:
          <input
            type="date"
            name="data_aquisicao"
            value={formData.data_aquisicao}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Instituição:
          <select
            name="instituicaoId"
            value={formData.instituicaoId}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione a instituição</option>
            {instituicoes.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {inst.nome}
              </option>
            ))}
          </select>
        </label>
        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            Salvar
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setFormMode("list")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
