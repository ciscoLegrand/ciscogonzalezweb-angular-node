"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const imagenesSchemema = new mongoose_1.Schema({
    img: {
        type: String,
        unique: true
    }
});
exports.Imagenes = mongoose_1.model('Imagenes', imagenesSchemema);
