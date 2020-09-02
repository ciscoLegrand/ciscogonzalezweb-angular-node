"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tecnologiasSchema = new mongoose_1.Schema({
    icono: {
        type: String,
        required: [true, 'El icono es obligatorio']
    },
    tecnologia: {
        type: String,
        required: [true, ' La tecnologia es obligatoria']
    },
    experiencia: {
        type: String,
        required: [true, 'La experiencia es obligatoria']
    }
});
exports.Tecnologias = mongoose_1.model('Tecnologias', tecnologiasSchema);
