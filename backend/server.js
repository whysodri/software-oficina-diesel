// backend/server.js
require('dotenv').config(); // Carrega variáveis do .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Permite requisições do front
app.use(express.json()); // Permite que o servidor entenda JSON

// 1. Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro de conexão:', err));

// 2. Rota de Teste (Root)
app.get('/', (req, res) => {
  res.send('API da Oficina Diesel em execução!');
});

// backend/server.js

// ... (após a conexão com o MongoDB)

// 3. Área para Rotas
const osRoutes = require('./routes/orderServiceRoutes'); // Importa as rotas
app.use('/api/os', osRoutes); // Define o endpoint base /api/os para o Front-end


// 3. Área para Rotas (Próximo passo)
// Exemplo: app.use('/api/veiculos', veiculoRoutes);

// Iniciar o Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});