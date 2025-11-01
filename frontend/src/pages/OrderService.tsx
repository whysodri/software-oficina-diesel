import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const OrderServicePage = () => {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState('');
  
  // Dados de exemplo
  const orders = [
    {
      id: 1,
      osNumber: 20240001,
      clientName: 'Transportes Rápidos',
      vehiclePlate: 'ABC1234',
      vehicleModel: 'Volvo FH 460',
      status: 'Em Serviço',
      entryDate: '2024-05-10',
      totalValue: 2030,
      paymentStatus: 'Pendente'
    },
    {
      id: 2,
      osNumber: 20240002,
      clientName: 'Logística Express',
      vehiclePlate: 'XYZ5678',
      vehicleModel: 'Scania R450',
      status: 'Aguardando Peças',
      entryDate: '2024-05-12',
      totalValue: 1200,
      paymentStatus: 'Parcialmente Pago'
    },
    {
      id: 3,
      osNumber: 20240003,
      clientName: 'Auto Peças Silva',
      vehiclePlate: 'DEF9012',
      vehicleModel: 'Mercedes-Benz Actros',
      status: 'Finalizado',
      entryDate: '2024-05-05',
      totalValue: 1550,
      paymentStatus: 'Pago'
    }
  ];

  // Filtrar ordens por status
  const filteredOrders = statusFilter 
    ? orders.filter(order => order.status === statusFilter)
    : orders;

  // Função para formatar valor monetário
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  // Função para obter a cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Aberto': return 'bg-blue-100 text-blue-800';
      case 'Em Serviço': return 'bg-yellow-100 text-yellow-800';
      case 'Aguardando Peças': return 'bg-orange-100 text-orange-800';
      case 'Finalizado': return 'bg-green-100 text-green-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ordens de Serviço</h1>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">Olá, {user?.name || 'Usuário'}</span>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <h2 className="text-2xl font-semibold text-gray-800">Ordens de Serviço</h2>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            {/* Filtro de Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos os Status</option>
              <option value="Aberto">Aberto</option>
              <option value="Em Serviço">Em Serviço</option>
              <option value="Aguardando Peças">Aguardando Peças</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
            
            {/* Botão Nova OS */}
            <button 
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Nova Ordem de Serviço
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OS Nº</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veículo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrada</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.osNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.clientName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.vehicleModel}</div>
                      <div className="text-xs text-gray-500">{order.vehiclePlate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.entryDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(order.totalValue)}</div>
                      <div className="text-xs text-gray-500">{order.paymentStatus}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderServicePage;