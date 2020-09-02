"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacto_model_1 = require("../models/contacto.model");
const contactoRutas = express_1.Router();
//crear mensaje
contactoRutas.post('/', (req, res) => {
    const body = req.body;
    contacto_model_1.Contacto.create(body)
        .then(contactoDB => {
        res.json({
            ok: true,
            contacto: contactoDB
        });
    })
        .catch(err => {
        res.json(err);
    });
});
//borrar mensajes
contactoRutas.delete('/:id', (req, res) => {
    const id = req.params.id;
    contacto_model_1.Contacto.findByIdAndRemove(id, (err, contactoBorrar) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            mensaje: 'Mensaje eliminado',
            body: contactoBorrar
        });
    });
});
// Obtener mensaje
contactoRutas.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const mensajes = yield contacto_model_1.Contacto
        .find()
        .sort({ _id: -1 })
        .limit(50)
        .exec();
    res.json({
        ok: true,
        mensajes
    });
}));
exports.default = contactoRutas;
