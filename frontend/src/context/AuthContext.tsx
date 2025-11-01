import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Definindo os tipos
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Criando o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API base URL
const API_URL = 'http://localhost:5000/api';

// Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar se o usuário já está autenticado ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          // Configurar o token no cabeçalho das requisições
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          
          // Verificar se o token é válido
          const response = await axios.get(`${API_URL}/users/verify`);
          
          if (response.status === 200) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
          } else {
            // Token inválido, fazer logout
            handleLogout();
          }
        } catch (error) {
          console.error('Erro ao verificar autenticação:', error);
          handleLogout();
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Função de login
  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    setIsLoading(true);
    
    // Modo de desenvolvimento - login simulado
    if (email === 'admin@exemplo.com' && password === '123456') {
      const mockUser = {
        id: '1',
        name: 'Administrador',
        email: 'admin@exemplo.com',
        role: 'admin'
      };
      const mockToken = 'mock-jwt-token-for-development';
      
      // Salvar no localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Atualizar o estado
      setToken(mockToken);
      setUser(mockUser);
      setIsLoading(false);
      
      return true;
    }
    
    try {
      // Tentativa de login real com a API (mantido para quando o backend estiver disponível)
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      
      if (response.status === 200 && response.data.token) {
        const { token, user } = response.data;
        
        // Salvar no localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Configurar o token no cabeçalho das requisições
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Atualizar o estado
        setToken(token);
        setUser(user);
        setIsLoading(false);
        
        return true;
      } else {
        setError('Credenciais inválidas');
        setIsLoading(false);
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao fazer login';
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  // Função de logout
  const handleLogout = () => {
    // Remover do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Remover o token do cabeçalho das requisições
    delete axios.defaults.headers.common['Authorization'];
    
    // Atualizar o estado
    setToken(null);
    setUser(null);
  };

  // Valor do contexto
  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    error
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};

// Componente para proteger rotas
export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  
  if (!isAuthenticated) {
    // Redirecionar para a página de login
    window.location.href = '/login';
    return null;
  }
  
  return <>{children}</>;
};