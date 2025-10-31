// backend/models/OrderService.js
const mongoose = require('mongoose');

// Define os esquemas internos para Peças e Serviços (Arrays dentro da OS)
const itemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true, min: 0 },
});

// Esquema Principal: Ordem de Serviço
const osSchema = new mongoose.Schema({
  osNumber: { type: Number, unique: true, required: true },
  
  // Detalhes do Cliente/Veículo (Idealmente referências a outros Models)
  clientName: { type: String, required: true },
  vehiclePlate: { type: String, required: true },
  vehicleModel: { type: String },
  kmEntry: { type: Number, required: true, min: 0 },
  
  // Status e Datas
  status: { 
    type: String, 
    enum: ['Aberto', 'Em Serviço', 'Aguardando Peças', 'Finalizado', 'Cancelado'],
    default: 'Aberto' 
  },
  entryDate: { type: Date, default: Date.now },
  finishDate: { type: Date },

  // Itens de Serviço e Peças
  services: [itemSchema], // Array de serviços realizados
  parts: [itemSchema],     // Array de peças utilizadas

  // Valores e Pagamento
  totalValue: { type: Number, default: 0 },
  paymentStatus: { 
    type: String, 
    enum: ['Pendente', 'Pago', 'Parcialmente Pago'],
    default: 'Pendente'
  },

  // Observações e Diagnóstico
  initialDiagnosis: { type: String },
  finalNotes: { type: String },
}, { timestamps: true }); // Adiciona campos 'createdAt' e 'updatedAt' automaticamente

module.exports = mongoose.model('OrderService', osSchema);