"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
//crear los campos que queremos insertarn en la bd
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        unique: true,
        reuqired: [true, ' El nombre es obligatorio']
    },
    password: {
        type: String,
        unique: true,
        required: [true, ' La contraseña es obligatoria']
    }
});
usuarioSchema.method('compararContrasena', function (password = '') {
    if (bcryptjs_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
