// backend/models/Client.js

const mongoose = require('mongoose');
const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    cpfCnpj: { // CPF ou CNPJ (usado para unificar o cadastro)
        type: String,
        unique: true,
        sparse: true // Permite que campos nulos sejam repetidos (útil se for opcional, mas aqui o ideal é que seja obrigatório/único)
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);