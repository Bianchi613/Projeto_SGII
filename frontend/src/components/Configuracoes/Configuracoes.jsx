import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Configuracoes.css";

export default function Configuracoes() {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    cargo: "",
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/usuarios/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsuario(res.data))
      .catch((err) => {
        console.error("Erro ao buscar usuário:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/usuarios/${usuario.id}`, usuario, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSucesso("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      setErro("Erro ao atualizar o perfil. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="configuracoes-container">
      <h1>Configurações do Perfil</h1>

      <form onSubmit={handleSubmit} className="configuracoes-form">
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

        <button type="submit">Salvar alterações</button>

        {sucesso && <p className="sucesso-msg">{sucesso}</p>}
        {erro && <p className="erro-msg">{erro}</p>}
      </form>
    </div>
  );
}
