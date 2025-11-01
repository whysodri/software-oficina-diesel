import React, { useState } from 'react';
import { FaFileAlt, FaCalendarAlt, FaChartBar, FaFilePdf } from 'react-icons/fa';

// Tipos para os relatórios
interface ReportData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'financial' | 'service' | 'client';
}

// Componente para o card de relatório
const ReportCard: React.FC<{ report: ReportData; onGenerate: (report: ReportData) => void }> = ({ report, onGenerate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="text-blue-600 text-2xl mr-3">{report.icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">{report.title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{report.description}</p>
      <button
        onClick={() => onGenerate(report)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
      >
        <FaFilePdf className="mr-2" /> Gerar Relatório
      </button>
    </div>
  );
};

// Componente principal de Relatórios
const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });
  const [selectedReportType, setSelectedReportType] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<ReportData | null>(null);

  // Lista de relatórios disponíveis
  const availableReports: ReportData[] = [
    {
      id: '1',
      title: 'Relatório Financeiro',
      description: 'Resumo de receitas, despesas e lucro no período selecionado.',
      icon: <FaChartBar />,
      type: 'financial',
    },
    {
      id: '2',
      title: 'Ordens de Serviço por Status',
      description: 'Quantidade de ordens de serviço por status no período.',
      icon: <FaFileAlt />,
      type: 'service',
    },
    {
      id: '3',
      title: 'Serviços Mais Realizados',
      description: 'Ranking dos serviços mais realizados no período.',
      icon: <FaChartBar />,
      type: 'service',
    },
    {
      id: '4',
      title: 'Clientes Mais Frequentes',
      description: 'Lista de clientes que mais utilizaram os serviços no período.',
      icon: <FaFileAlt />,
      type: 'client',
    },
  ];

  // Filtrar relatórios por tipo
  const filteredReports = selectedReportType === 'all'
    ? availableReports
    : availableReports.filter(report => report.type === selectedReportType);

  // Função para gerar relatório
  const handleGenerateReport = (report: ReportData) => {
    if (!dateRange.startDate || !dateRange.endDate) {
      alert('Por favor, selecione um período para o relatório.');
      return;
    }

    setIsGenerating(true);
    setGeneratedReport(null);

    // Simulando a geração do relatório
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReport(report);
    }, 1500);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Relatórios</h1>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filtros</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Inicial
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Final
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Relatório
            </label>
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todos os Relatórios</option>
              <option value="financial">Financeiros</option>
              <option value="service">Serviços</option>
              <option value="client">Clientes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Relatórios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onGenerate={handleGenerateReport}
          />
        ))}
      </div>

      {/* Modal de Geração de Relatório */}
      {(isGenerating || generatedReport) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            {isGenerating ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-700">Gerando relatório...</p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Relatório Gerado</h3>
                <p className="text-gray-600 mb-4">
                  O relatório <strong>{generatedReport?.title}</strong> foi gerado com sucesso para o período de{' '}
                  <strong>{new Date(dateRange.startDate).toLocaleDateString()}</strong> a{' '}
                  <strong>{new Date(dateRange.endDate).toLocaleDateString()}</strong>.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setGeneratedReport(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Fechar
                  </button>
                  <button
                    onClick={() => alert('Download iniciado!')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <FaFilePdf className="inline mr-2" /> Download PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;