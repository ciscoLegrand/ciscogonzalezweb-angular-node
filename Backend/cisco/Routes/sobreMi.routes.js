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
const autentificacion_middleware_1 = require("../middlewares/autentificacion.middleware");
const sobreMi_model_1 = require("../models/sobreMi.model");
const sobreMiRutas = express_1.Router();
//crear sobre-mi
sobreMiRutas.post('/', autentificacion_middleware_1.verificarToken, (req, res) => {
    const body = req.body;
    body.titulo = 'Cisco Gonzalez Dev';
    sobreMi_model_1.SobreMi.create(body)
        .then(sobreMiDB => {
        res.json({
            ok: true,
            sobreMi: sobreMiDB
        });
    })
        .catch(err => {
        res.json(err);
    });
});
//Actualizar sobre-mi
sobreMiRutas.post('/update/:id', autentificacion_middleware_1.verificarToken, (req, res) => {
    const id = req.params.id;
    const sobreMi = {
        texto1: req.body.texto1,
        texto2: req.body.texto2,
        texto3: req.body.texto3,
        texto4: req.body.texto4,
        texto5: req.body.texto5,
    };
    //{new: true} -> borra el anterior registro y añade uno nuevo a modo de actualización
    sobreMi_model_1.SobreMi.findByIdAndUpdate(id, sobreMi, { new: true }, (err, sobremiDB) => {
        if (err)
            throw err;
        if (!sobremiDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            sobreMi
        });
    });
});
//Obtener sobre-mi
sobreMiRutas.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const sobreMi = yield sobreMi_model_1.SobreMi.find()
        .sort({ _id: -1 })
        .exec();
    res.json({
        ok: true,
        sobreMi
    });
}));
exports.default = sobreMiRutas;
