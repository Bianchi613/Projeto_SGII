import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Instituicao.css";

export default function Instituicao() {
  const [instituicao, setInstituicao] = useState(null);
  const [form, setForm] = useState({ nome: "", tipo: "", cnpj_ou_codigo: "" });
  const [editando, setEditando] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/instituicoes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.length > 0) {
          setInstituicao(res.data[0]);
          setForm(res.data[0]);
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar instituicao:", err);
        setErro("Erro ao carregar dados da instituição");
      });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:3000/instituicoes/${instituicao.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInstituicao({ ...instituicao, ...form });
      setEditando(false);
    } catch (err) {
      console.error(err);
      setErro("Erro ao salvar alterações");
    }
  };

  if (!instituicao) {
    return <p className="loading">Carregando...</p>;
  }

  return (
    <div className="instituicao-container">
      <h1>Informações da Instituição</h1>

      {erro && <p className="erro">{erro}</p>}

      {!editando ? (
        <div className="info-box">
          <p><strong>Nome:</strong> {instituicao.nome}</p>
          <p><strong>Tipo:</strong> {instituicao.tipo}</p>
          <p><strong>CNPJ/Código:</strong> {instituicao.cnpj_ou_codigo}</p>
          <button className="editar" onClick={() => setEditando(true)}>Editar</button>
        </div>
      ) : (
        <form className="form-edicao" onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />

          <label>Tipo:</label>
          <input value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} />

          <label>CNPJ ou Código:</label>
          <input value={form.cnpj_ou_codigo} onChange={(e) => setForm({ ...form, cnpj_ou_codigo: e.target.value })} />

          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setEditando(false)}>Cancelar</button>
        </form>
      )}
    </div>
  );
}
