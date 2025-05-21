import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // Buscar todas as instituições
  const fetchInstituicoes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/instituicoes", {
        headers,
      });
      setInstituicoes(res.data);
    } catch (err) {
      console.error("Erro ao carregar instituições:", err);
      setErro("Erro ao carregar dados das instituições");
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchInstituicoes();
  }, [navigate, token]);

  // Handle campos do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Criar nova instituição
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/instituicoes", form, { headers });
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

  // Iniciar edição (preenche formulário)
  const startEdit = (instituicao) => {
    setForm(instituicao);
    setEditandoId(instituicao.id);
    setErro("");
  };

  // Cancelar edição
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

  // Atualizar instituição existente
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/instituicoes/${editandoId}`,
        form,
        { headers }
      );
      cancelarEdicao();
      fetchInstituicoes();
      setErro("");
    } catch (err) {
      console.error(err);
      setErro("Erro ao atualizar instituição");
    }
  };

  // Deletar instituição
  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja remover esta instituição?")) return;
    try {
      await axios.delete(`http://localhost:3000/instituicoes/${id}`, { headers });
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

      <form onSubmit={editandoId ? handleUpdate : handleCreate} className="form-instituicao">
        <label>Nome:</label>
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <label>Tipo:</label>
        <input
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          required
        />

        <label>CNPJ ou Código:</label>
        <input
          name="cnpj_ou_codigo"
          value={form.cnpj_ou_codigo}
          onChange={handleChange}
          required
        />

        <label>Endereço:</label>
        <input
          name="endereco"
          value={form.endereco}
          onChange={handleChange}
        />

        <label>Telefone:</label>
        <input
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
        />

        <label>E-mail:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <button type="submit">
          {editandoId ? "Salvar Alterações" : "Criar Instituição"}
        </button>
        {editandoId && (
          <button type="button" onClick={cancelarEdicao}>
            Cancelar
          </button>
        )}
      </form>

      <hr />

      <h2>Lista de Instituições</h2>
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
          {instituicoes.map((inst) => (
            <tr key={inst.id}>
              <td>{inst.id}</td>
              <td>{inst.nome}</td>
              <td>{inst.tipo}</td>
              <td>{inst.cnpj_ou_codigo}</td>
              <td>{inst.endereco || "-"}</td>
              <td>{inst.telefone || "-"}</td>
              <td>{inst.email || "-"}</td>
              <td>
                <button onClick={() => startEdit(inst)}>Editar</button>
                <button onClick={() => handleDelete(inst.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
