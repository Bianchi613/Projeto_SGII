import { useState } from 'react';
import './Login.css';
<div className="bg-red-500 text-white p-4 text-center text-xl">
  Tailwind está funcionando!
</div>



export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    alert('Autenticação realizada com sucesso!');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Lado esquerdo */}
        <div className="bg-custom-gradient text-gray-900 p-10 md:w-1/2 flex flex-col justify-center items-center text-center border-r border-gray-200">
          <div className="mb-8">
            <i className="fas fa-boxes text-5xl mb-4 text-gray-800"></i>
            <h1 className="text-3xl font-bold mb-2">SGII</h1>
            <p className="text-gray-600 font-medium">Sistema de Gestão de Infraestrutura e Inventário</p>
          </div>

          <div className="space-y-6 mt-8">
            <Feature icon="building" text="Controle total de infraestrutura e inventário" />
            <Feature icon="clipboard-check" text="Gestão de ativos e recursos físicos" />
            <Feature icon="chart-line" text="Relatórios e análises de utilização" />
          </div>

          <div className="mt-12 text-sm text-gray-500">
            <p>Suporte técnico: alanbianchi@coppe.ufrj.br</p>
          </div>
        </div>

        {/* Lado direito - Formulário */}
        <div className="p-10 md:w-1/2 flex flex-col justify-center bg-white">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Acesse o sistema</h2>
            <p className="text-gray-600">Controle de infraestrutura e inventário</p>
          </div>

          <form onSubmit={handleSubmit} className={`space-y-6 ${shake ? 'shake' : ''}`}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
              <div className="relative">
                <i className="fas fa-user absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"></i>
                <input
                  type="text"
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 input-focus transition duration-200"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <div className="relative">
                <i className="fas fa-lock absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="pl-10 pr-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 input-focus transition duration-200"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-gray-800 focus:ring-gray-800 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Lembrar de mim
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-gray-800 hover:text-gray-600">Esqueceu sua senha?</a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
              >
                Entrar
              </button>
            </div>

            <div className="text-center text-sm text-gray-500">
              Não tem acesso? <a href="#" className="font-medium text-gray-800 hover:text-gray-600">Solicitar credenciais</a>
            </div>
          </form>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-xs text-gray-500 text-center">
              © 2025 SGII - Sistema de Gestão de Infraestrutura e Inventário<br />
              Versão 1.0.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="bg-gray-800 text-white p-3 rounded-full">
        <i className={`fas fa-${icon} text-xl`}></i>
      </div>
      <p className="text-left text-gray-700">{text}</p>
    </div>
  );
}
