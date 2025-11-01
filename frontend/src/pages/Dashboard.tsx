import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header com informações do usuário e botão de logout */}
      <header className="bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Oficina Diesel - Painel</h1>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">Olá, {user?.name || 'Usuário'}</span>
            <button 
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo do Dashboard */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Principal</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Total de Clientes */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500">
            <p className="text-sm font-medium text-gray-500">Total de Clientes</p>
            <p className="text-4xl font-extrabold text-indigo-700 mt-1">128</p>
          </div>

          {/* Card 2: Ordens Abertas */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
            <p className="text-sm font-medium text-gray-500">Ordens de Serviço Abertas</p>
            <p className="text-4xl font-extrabold text-yellow-700 mt-1">14</p>
          </div>

          {/* Card 3: Receita Mensal Estimada */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <p className="text-sm font-medium text-gray-500">Receita Estimada (Mês)</p>
            <p className="text-3xl font-extrabold text-green-700 mt-1">R$ 15.500,00</p>
          </div>

          {/* Card 4: Veículos em Espera */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
            <p className="text-sm font-medium text-gray-500">Veículos Aguardando Peças</p>
            <p className="text-4xl font-extrabold text-red-700 mt-1">3</p>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Avisos e Atividades Recentes</h2>
          <ul className="space-y-3">
            <li className="p-3 bg-indigo-50 rounded-lg flex justify-between items-center">
              <span className="text-sm font-medium text-indigo-800">Nova OS #2024-0012 criada.</span>
              <span className="text-xs text-gray-500">5 minutos atrás</span>
            </li>
            <li className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
              <span className="text-sm font-medium text-gray-800">Peças recebidas para OS #2024-0008.</span>
              <span className="text-xs text-gray-500">2 horas atrás</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
