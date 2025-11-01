// backend/controllers/userController.js

const User = require('../models/User'); // Importe o modelo de Usuário
// const bcrypt = require('bcryptjs'); // Dependências futuras
// const jwt = require('jsonwebtoken'); // Dependências futuras

// Função de Registro (Signup)
exports.register = async (req, res) => {
    try {
        // Lógica de hashing e criação de usuário aqui
        res.status(201).json({ message: 'Usuário registrado com sucesso (Lógica pendente).' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Função de Login (Signin)
exports.login = async (req, res) => {
    try {
        // Lógica de comparação de senha e geração de JWT aqui
        res.status(200).json({ message: 'Login realizado com sucesso (Lógica pendente).' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};