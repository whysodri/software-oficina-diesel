// backend/routes/orderServiceRoutes.js
const express = require('express');
const router = express.Router();
const OrderService = require('../models/OrderService');

// Middleware para calcular o total da OS (simplificado)
function calculateTotal(req, res, next) {
    let total = 0;
    
    // Calcula o total dos Serviços
    if (req.body.services) {
        req.body.services.forEach(item => {
            total += item.quantity * item.unitPrice;
            item.total = item.quantity * item.unitPrice; // Atualiza o total do item
        });
    }

    // Calcula o total das Peças
    if (req.body.parts) {
        req.body.parts.forEach(item => {
            total += item.quantity * item.unitPrice;
            item.total = item.quantity * item.unitPrice; // Atualiza o total do item
        });
    }

    req.body.totalValue = total;
    next();
}

// 1. POST: Criar nova Ordem de Serviço
router.post('/', calculateTotal, async (req, res) => {
  try {
    // Busca o maior número de OS atual e incrementa para a nova
    const latestOS = await OrderService.findOne().sort({ osNumber: -1 });
    const nextOSNumber = latestOS ? latestOS.osNumber + 1 : 1001; // Começa em 1001
    
    const os = new OrderService({
        ...req.body,
        osNumber: nextOSNumber,
    });

    const newOS = await os.save();
    res.status(201).json(newOS);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 2. GET: Listar todas as Ordens de Serviço
router.get('/', async (req, res) => {
  try {
    const osList = await OrderService.find().sort({ entryDate: -1 });
    res.json(osList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. GET: Obter uma única OS pelo ID
router.get('/:id', async (req, res) => {
  try {
    const os = await OrderService.findById(req.params.id);
    if (!os) return res.status(404).json({ message: 'OS não encontrada.' });
    res.json(os);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. PUT: Atualizar uma Ordem de Serviço
router.put('/:id', calculateTotal, async (req, res) => {
    try {
        const updatedOS = await OrderService.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Retorna o documento atualizado
        );
        res.json(updatedOS);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 5. DELETE: Remover uma Ordem de Serviço
router.delete('/:id', async (req, res) => {
    try {
        await OrderService.findByIdAndDelete(req.params.id);
        res.json({ message: 'OS deletada com sucesso.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;