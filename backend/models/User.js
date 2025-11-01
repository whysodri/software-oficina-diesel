// backend/models/User.js

const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Garante que o email é único
    },
    password: {
        type: String,
        required: true
    },
    role: { // Para diferenciar Admin, Funcionário, etc.
        type: String,
        default: 'employee'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);