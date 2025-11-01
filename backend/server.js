require('dotenv').config(); // Carrega variáveis do .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Permite requisições do frontend
app.use(express.json()); // Permite que o servidor entenda JSON

// 1. Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro de conexão:', err));

// 2. Rota de Teste (Root)
app.get('/', (req, res) => {
  res.send('API da Oficina Diesel em execução!');
});

// 3. Área para Rotas
// --- IMPORTAÇÃO DE ROTAS ---
const osRoutes = require('./routes/orderServiceRoutes');
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');

// --- USO DAS ROTAS (Definição dos Endpoints) ---
app.use('/api/os', osRoutes);       // Endpoint para Ordem de Serviço
app.use('/api/users', userRoutes);   // Endpoint para Usuários/Autenticação
app.use('/api/clients', clientRoutes); // Endpoint para Cadastro de Clientes

// Iniciar o Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  
});
