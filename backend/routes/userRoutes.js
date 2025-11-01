const express = require('express');
const router = express.Router();
// CORREÇÃO FINAL: Usando o nome do arquivo que existe no seu disco local ('userControllers')
const userController = require('../controllers/userControllers'); 

// Rotas de Autenticação
// POST: Cria um novo usuário
router.post('/register', userController.register);

// POST: Realiza o login
router.post('/login', userController.login);

module.exports = router;
