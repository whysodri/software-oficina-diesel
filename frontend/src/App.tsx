import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; // Garante que a importação do Login está correta
// import Dashboard from './pages/Dashboard'; // Componente placeholder futuro

const App: React.FC = () => {
  return (
    <Routes>
      {/* A rota principal (/) deve carregar o Login. 
        Este é o ponto de entrada da aplicação antes da autenticação.
      */}
      <Route path="/" element={<Login />} />

      {/* As rotas protegidas futuras (Dashboard, Clientes, OS) serão adicionadas aqui. 
        Exemplo: <Route path="/dashboard" element={<Dashboard />} />
      */}
    </Routes>
  );
};

export default App;
