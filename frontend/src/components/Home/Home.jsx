import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-8">
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl border border-gray-200 p-10 text-center">
        <i className="fas fa-box-open text-6xl text-gray-800 mb-6"></i>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bem-vindo ao SGII
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Sistema de Gestão de Infraestrutura e Inventário
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <Feature
            icon="building"
            text="Controle total de infraestrutura e inventário"
          />
          <Feature
            icon="clipboard-check"
            text="Gestão de ativos e recursos físicos"
          />
          <Feature
            icon="chart-line"
            text="Relatórios e análises de utilização"
          />
        </div>
        <div className="mt-10">
          <button
            onClick={() => navigate("/login")}
            className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            Acessar o sistema
          </button>
        </div>
        <div className="mt-8 text-sm text-gray-500">
          <p>Suporte técnico: alanbianchi@coppe.ufrj.br</p>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-gray-800 text-white p-3 rounded-full">
        <i className={`fas fa-${icon} text-xl`}></i>
      </div>
      <p className="text-gray-700 flex-1">{text}</p>
    </div>
  );
}
