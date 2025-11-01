const Client = require('../models/Client'); // Importa o modelo de Cliente

// --- Funções CRUD do Cliente ---

// 1. Criar Novo Cliente
exports.createClient = async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).json(client);
    } catch (error) {
        // Erro 400 é comum para dados inválidos (ex: CPF/CNPJ duplicado, campo obrigatório faltando)
        res.status(400).json({ message: 'Erro ao criar cliente. Verifique os dados.', error: error.message });
    }
};

// 2. Listar Todos os Clientes
exports.getAllClients = async (req, res) => {
    try {
        // Busca todos os clientes, ordenando pelo nome
        const clients = await Client.find().sort({ name: 1 });
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar a lista de clientes.', error: error.message });
    }
};

// 3. Buscar Cliente por ID
exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.status(200).json(client);
    } catch (error) {
        // Erro 500 ou 400 (dependendo se o ID é mal formatado)
        res.status(500).json({ message: 'Erro ao buscar cliente por ID.', error: error.message });
    }
};

// 4. Atualizar Cliente
exports.updateClient = async (req, res) => {
    try {
        // { new: true } retorna o documento atualizado
        // { runValidators: true } garante que as regras do Schema sejam aplicadas
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!client) {
            return res.status(404).json({ message: 'Cliente não encontrado para atualização' });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar cliente. Verifique o formato dos dados.', error: error.message });
    }
};

// 5. Deletar Cliente
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Cliente não encontrado para exclusão' });
        }
        res.status(200).json({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar cliente.', error: error.message });
    }
};
