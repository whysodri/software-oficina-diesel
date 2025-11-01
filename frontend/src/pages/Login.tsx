import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6">
          Acesso à Oficina Diesel
        </h1>
        <p className="text-gray-600 font-semibold text-lg">
          Página de Login (WIP)
        </p>
        <p className="text-gray-500 mt-4">
          O componente principal de login e autenticação será construído aqui.
          Esta tela deve sumir e exibir o Dashboard.
        </p>
        <button
          onClick={() => alert('Em breve teremos o formulário de login!')}
          className="mt-8 w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Entrar (Teste)
        </button>
      </div>
    </div>
  );
};

export default Login;
