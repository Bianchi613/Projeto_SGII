import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Configuracoes.css";

export default function Configuracoes() {
  const [usuario, setUsuario] = useState({
    id: null,
    nome: "",
    email: "",
    cargo: "",
    senha: "", // senha opcional na edição
    instituicao_id: null,
    nivel_acesso: 1,
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [criando, setCriando] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (!criando) {
      axios
        .get("http://localhost:3000/usuarios/me", { headers })
        .then((res) => {
          setUsuario({ ...res.data, senha: "" }); // limpa senha para edição
          setErro("");
        })
        .catch((err) => {
          console.error("Erro ao buscar usuário:", err);
          if (err.response?.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            setErro("Erro ao carregar dados do usuário.");
          }
        });
    } else {
      // Modo criação: limpa formulário
      setUsuario({
        id: null,
        nome: "",
        email: "",
        cargo: "",
        senha: "",
        instituicao_id: null,
        nivel_acesso: 1,
      });
      setErro("");
      setSucesso("");
    }
  }, [navigate, token, criando]);

  const handleAtualizar = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    try {
      const payload = { ...usuario };
      if (!payload.senha) delete payload.senha; // não envia senha vazia
      await axios.put(`http://localhost:3000/usuarios/${usuario.id}`, payload, { headers });
      setSucesso("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      setErro("Erro ao atualizar o perfil. Tente novamente mais tarde.");
    }
  };

  const handleCriar = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    if (!usuario.senha) {
      setErro("Senha é obrigatória para criação");
      return;
    }
    try {
      const payload = { ...usuario };
      await axios.post("http://localhost:3000/usuarios", payload, { headers });
      setSucesso("Usuário criado com sucesso!");
      setCriando(false);
    } catch (err) {
      console.error(err);
      setErro("Erro ao criar usuário. Tente novamente mais tarde.");
    }
  };

  const handleDeletar = async () => {
    if (!usuario.id) return;
    if (!window.confirm("Tem certeza que deseja deletar seu perfil? Esta ação é irreversível.")) return;
    try {
      await axios.delete(`http://localhost:3000/usuarios/${usuario.id}`, { headers });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setErro("Erro ao deletar o perfil.");
    }
  };

  return (
    <div className="configuracoes-container">
      <h1>{criando ? "Criar Novo Usuário" : "Configurações do Perfil"}</h1>

      <form onSubmit={criando ? handleCriar : handleAtualizar} className="configuracoes-form">
        <label>Nome</label>
        <input
          type="text"
          value={usuario.nome}
          onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={usuario.email}
          onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          required
        />

        <label>Cargo</label>
        <input
          type="text"
          value={usuario.cargo}
          onChange={(e) => setUsuario({ ...usuario, cargo: e.target.value })}
          required
        />

        <label>
          Senha {criando ? "*" : "(deixe vazio para não alterar)"}
        </label>
        <input
          type="password"
          value={usuario.senha}
          onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
          required={criando}
        />

        <label>Instituição ID</label>
        <input
          type="number"
          value={usuario.instituicao_id || ""}
          onChange={(e) => setUsuario({ ...usuario, instituicao_id: Number(e.target.value) })}
          required
        />

        <label>Nível de Acesso</label>
        <input
          type="number"
          min={1}
          max={5}
          value={usuario.nivel_acesso}
          onChange={(e) => setUsuario({ ...usuario, nivel_acesso: Number(e.target.value) })}
          required
        />

        <button type="submit">{criando ? "Criar Usuário" : "Salvar alterações"}</button>
      </form>

      {erro && <p className="erro-msg">{erro}</p>}
      {sucesso && <p className="sucesso-msg">{sucesso}</p>}

      {!criando && (
        <>
          <button className="btn-deletar" onClick={handleDeletar}>
            Deletar Perfil
          </button>
          <button className="btn-criar" onClick={() => setCriando(true)}>
            Criar Novo Usuário
          </button>
        </>
      )}

      {criando && (
        <button className="btn-cancelar" onClick={() => setCriando(false)}>
          Cancelar Criação
        </button>
      )}
    </div>
  );
}
