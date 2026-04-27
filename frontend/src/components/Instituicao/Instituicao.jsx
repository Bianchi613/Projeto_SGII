import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Instituicao.css";

export default function Instituicao() {
  const [instituicoes, setInstituicoes] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    tipo: "",
    cnpj_ou_codigo: "",
    endereco: "",
    telefone: "",
    email: "",
  });
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const fetchInstituicoes = useCallback(async () => {
    try {
      const res = await api.get("/instituicoes");
      setInstituicoes(res.data);
    } catch (err) {
      console.error("Erro ao carregar instituições:", err);
      setErro("Erro ao carregar dados das instituições");
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchInstituicoes();
  }, [fetchInstituicoes]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/instituicoes", form);
      setForm({
        nome: "",
        tipo: "",
        cnpj_ou_codigo: "",
        endereco: "",
        telefone: "",
        email: "",
      });
      fetchInstituicoes();
      setErro("");
    } catch (err) {
      console.error(err);
      setErro("Erro ao criar instituição");
    }
  };

  const startEdit = (instituicao) => {
    setForm(instituicao);
    setEditandoId(instituicao.id);
    setErro("");
  };

  const cancelarEdicao = () => {
    setForm({
      nome: "",
      tipo: "",
      cnpj_ou_codigo: "",
      endereco: "",
      telefone: "",
      email: "",
    });
    setEditandoId(null);
    setErro("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/instituicoes/${editandoId}`, form);
      cancelarEdicao();
      fetchInstituicoes();
      setErro("");
    } catch (err) {
      console.error(err);
      setErro("Erro ao atualizar instituição");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja remover esta instituição?"))
      return;
    try {
      await api.delete(`/instituicoes/${id}`);
      if (editandoId === id) cancelarEdicao();
      fetchInstituicoes();
      setErro("");
    } catch (err) {
      console.error(err);
      setErro("Erro ao remover instituição");
    }
  };

  return (
    <div className="instituicao-container">
      <h1>Gestão de Instituições</h1>

      {erro && <p className="erro">{erro}</p>}

      <form
        onSubmit={editandoId ? handleUpdate : handleCreate}
        className="form-instituicao"
        noValidate
      >
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipo">Tipo:</label>
          <input
            id="tipo"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cnpj_ou_codigo">CNPJ ou Código:</label>
          <input
            id="cnpj_ou_codigo"
            name="cnpj_ou_codigo"
            value={form.cnpj_ou_codigo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endereco">Endereço:</label>
          <input
            id="endereco"
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <input
            id="telefone"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {editandoId ? "Salvar Alterações" : "Criar Instituição"}
          </button>
          {editandoId && (
            <button
              type="button"
              onClick={cancelarEdicao}
              className="btn-secondary"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <hr />

      <h2>Lista de Instituições</h2>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>CNPJ/Código</th>
              <th>Endereço</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {instituicoes.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  Nenhuma instituição cadastrada.
                </td>
              </tr>
            ) : (
              instituicoes.map((inst) => (
                <tr key={inst.id}>
                  <td>{inst.id}</td>
                  <td>{inst.nome}</td>
                  <td>{inst.tipo}</td>
                  <td>{inst.cnpj_ou_codigo}</td>
                  <td>{inst.endereco || "-"}</td>
                  <td>{inst.telefone || "-"}</td>
                  <td>{inst.email || "-"}</td>
                  <td>
                    <div className="btn-actions-container">
                      <button
                        className="btn-action"
                        onClick={() => startEdit(inst)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-action btn-danger"
                        onClick={() => handleDelete(inst.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
