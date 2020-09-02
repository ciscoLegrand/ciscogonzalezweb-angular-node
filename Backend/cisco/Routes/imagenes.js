"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autentificacion_1 = require("../middlewares/autentificacion");
const imagenes_routes_1 = require("../models/imagenes.routes");
const rutas = express_1.Router();
//subir imagenes
rutas.post('/', autentificacion_1.verificarToken, (req, res) => {
    const body = req.body;
    const file = req.files.img;
    body.img = file.name;
    console.log(file);
    imagenes_routes_1.Imagenes.create(body)
        .then(imgDB => {
        res.json({
            ok: true,
            imgDB
        });
    })
        .catch(err => {
        res.json(err);
    });
});
exports.default = rutas;
