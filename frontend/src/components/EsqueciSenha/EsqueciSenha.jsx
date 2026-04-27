import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./EsqueciSenha.css";

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Substitua pela sua rota real de recuperação de senha se tiver
      await api.post("/auth/recuperar-senha", { email });
      setEnviado(true);
    } catch (err) {
      console.error("Erro ao enviar instruções:", err);
      alert("Erro ao enviar instruções. Verifique o e-mail.");
    }
  };

  return (
    <div className="esqueci-senha-container">
      <h2>Esqueceu sua senha?</h2>
      {enviado ? (
        <p>
          Se o e-mail estiver cadastrado, você receberá instruções para
          redefinir a senha.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="esqueci-senha-form">
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
          />
          <button type="submit">Enviar instruções</button>
        </form>
      )}
      <button className="voltar-login" onClick={() => navigate("/login")}>
        Voltar ao login
      </button>
    </div>
  );
}
