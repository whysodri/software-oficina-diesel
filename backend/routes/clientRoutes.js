const express = require('express');
const router = express.Router();
// IMPORTAÇÃO CRUCIAL: O arquivo que contém a lógica CRUD
const clientController = require('../controllers/clientController'); 

// Rotas CRUD da entidade Cliente
// POST: Cria um novo cliente
router.post('/', clientController.createClient);

// GET: Lista todos os clientes
router.get('/', clientController.getAllClients);

// GET por ID: Busca um cliente específico
router.get('/:id', clientController.getClientById);

// PUT: Atualiza um cliente existente
router.put('/:id', clientController.updateClient);

// DELETE: Deleta um cliente
router.delete('/:id', clientController.deleteClient);

module.exports = router;
