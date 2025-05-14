import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cadastro.css";

export default function Cadastro() {
  const [instituicoes, setInstituicoes] = useState([]);
  const [usarExistente, setUsarExistente] = useState(true);
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    cargo: "",
    nivel_acesso: 1,
  });
  const [instituicaoId, setInstituicaoId] = useState("");
  const [novaInstituicao, setNovaInstituicao] = useState({
    nome: "",
    cnpj_ou_codigo: "",
    tipo: "",
  });
  const [erro, setErro] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/instituicoes")
      .then((res) => setInstituicoes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let idInstituicao = instituicaoId;

      if (!usarExistente) {
        const res = await axios.post(
          "http://localhost:3000/instituicoes",
          novaInstituicao,
        );
        idInstituicao = res.data.id;
      }

      await axios.post("http://localhost:3000/usuarios", {
        ...usuario,
        senha_hash: usuario.senha,
        instituicao_id: idInstituicao,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      setErro("Erro ao cadastrar. Verifique os dados e tente novamente.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 p-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Cadastro de Acesso
        </h2>

        <form
          onSubmit={handleSubmit}
          className={`space-y-6 ${shake ? "shake" : ""}`}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              value={usuario.nome}
              onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={usuario.email}
              onChange={(e) =>
                setUsuario({ ...usuario, email: e.target.value })
              }
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={usuario.senha}
              onChange={(e) =>
                setUsuario({ ...usuario, senha: e.target.value })
              }
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cargo
            </label>
            <input
              type="text"
              value={usuario.cargo}
              onChange={(e) =>
                setUsuario({ ...usuario, cargo: e.target.value })
              }
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nível de Acesso
            </label>
            <input
              type="number"
              value={usuario.nivel_acesso}
              onChange={(e) =>
                setUsuario({
                  ...usuario,
                  nivel_acesso: parseInt(e.target.value),
                })
              }
              className="input"
              required
            />
          </div>

          <div className="border-t pt-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Instituição
            </label>
            <div className="flex space-x-4 items-center mb-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={usarExistente}
                  onChange={() => setUsarExistente(true)}
                  className="form-radio"
                />
                <span className="ml-2">Usar existente</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={!usarExistente}
                  onChange={() => setUsarExistente(false)}
                  className="form-radio"
                />
                <span className="ml-2">Criar nova</span>
              </label>
            </div>

            {usarExistente ? (
              <select
                value={instituicaoId}
                onChange={(e) => setInstituicaoId(e.target.value)}
                className="input"
              >
                <option value="">Selecione uma instituição</option>
                {instituicoes.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.nome}
                  </option>
                ))}
              </select>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Nome da instituição"
                  value={novaInstituicao.nome}
                  onChange={(e) =>
                    setNovaInstituicao({
                      ...novaInstituicao,
                      nome: e.target.value,
                    })
                  }
                  className="input mb-2"
                />
                <input
                  type="text"
                  placeholder="CNPJ ou código"
                  value={novaInstituicao.cnpj_ou_codigo}
                  onChange={(e) =>
                    setNovaInstituicao({
                      ...novaInstituicao,
                      cnpj_ou_codigo: e.target.value,
                    })
                  }
                  className="input mb-2"
                />
                <input
                  type="text"
                  placeholder="Tipo"
                  value={novaInstituicao.tipo}
                  onChange={(e) =>
                    setNovaInstituicao({
                      ...novaInstituicao,
                      tipo: e.target.value,
                    })
                  }
                  className="input"
                />
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition duration-200 font-bold"
          >
            Cadastrar
          </button>

          {erro && (
            <div className="text-red-500 text-center text-sm">{erro}</div>
          )}
        </form>
      </div>
    </div>
  );
}
