// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();

// Iremos adicionar o controller aqui no próximo passo, mas a rota já é definida
// Exemplo: router.post('/register', userController.register);

router.get('/test', (req, res) => {
    res.send('Rotas de Usuário funcionando');
});

module.exports = router;