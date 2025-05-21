import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-8">
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl border border-gray-200 p-10 text-center">
        <i className="fas fa-boxes text-5xl mb-4 text-blue-900"></i>
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Bem-vindo ao SGII
        </h1>
        <p className="text-black-900 text-lg mb-6">
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
            className="inline-block bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            Acessar o sistema
          </button>
        </div>
        <div className="mt-8 text-sm text-black-600">
          <p>Suporte técnico: alanbianchi@coppe.ufrj.br</p>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-blue-900 text-white p-3 rounded-full">
        <i className={`fas fa-${icon} text-xl`}></i>
      </div>
      <p className="text-black-800 flex-1">{text}</p>
    </div>
  );
}
