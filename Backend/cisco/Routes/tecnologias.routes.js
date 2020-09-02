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
const tecnologias_model_1 = require("../models/tecnologias.model");
const tecnologiasRutas = express_1.Router();
//crear tecnologias
tecnologiasRutas.post('/', autentificacion_middleware_1.verificarToken, (req, res) => {
    const body = req.body;
    tecnologias_model_1.Tecnologias.create(body)
        .then(tecnologiaDB => {
        res.json({
            ok: true,
            tecnologia: tecnologiaDB
        });
    })
        .catch(err => {
        res.json(err);
    });
});
//Actualizar tecnologias
tecnologiasRutas.post('/update/:id', autentificacion_middleware_1.verificarToken, (req, res) => {
    const id = req.params.id;
    const tecnologia = {
        icono: req.body.icono,
        tecnologia: req.body.tecnologia,
        experiencia: req.body.experiencia
    };
    //{new: true} -> borra el anterior registro y añade uno nuevo a modo de actualización
    tecnologias_model_1.Tecnologias.findByIdAndUpdate(id, tecnologia, { new: true }, (err, tecnologiaDB) => {
        if (err)
            throw err;
        if (!tecnologiaDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        res.json({
            ok: true,
            tecnologia
        });
    });
});
//obtener tecnologias
tecnologiasRutas.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const tecnologias = yield tecnologias_model_1.Tecnologias.find()
        .sort({ _id: -1 })
        .exec();
    res.json({
        ok: true,
        tecnologias
    });
}));
exports.default = tecnologiasRutas;
