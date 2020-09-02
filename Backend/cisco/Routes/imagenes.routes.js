"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autentificacion_middleware_1 = require("../middlewares/autentificacion.middleware");
const imagenes_model_1 = require("../models/imagenes.model");
const fileSystem_class_1 = __importDefault(require("../classes/fileSystem.class"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const rutas = express_1.Router();
const fileSystemImg = new fileSystem_class_1.default();
//subir imagenes
rutas.post('/', autentificacion_middleware_1.verificarToken, (req, res) => {
    const body = req.body;
    const file = req.files.img;
    body.img = file.name;
    console.log(file);
    imagenes_model_1.Imagenes.create(body)
        .then(imgDB => {
        res.json({
            ok: true,
            imgDB
        });
        fileSystemImg.guardarImagen(file, req.usuario.nombre);
    })
        .catch(err => {
        res.json(err);
    });
});
//mostrar imagen por URL
rutas.get('/ciscolegrand/:img', (req, res) => {
    const img = req.params.img;
    const pathImagen = fileSystemImg.getImgUrl(img);
    res.sendFile(pathImagen);
});
//actualizar imagen
rutas.post('/update', autentificacion_middleware_1.verificarToken, (req, res) => {
    const file = req.files.img;
    fileSystemImg.guardarImagen(file, req.usuario.nombre);
    res.json({
        ok: true,
        mensaje: 'Imagen actualizada con exito'
    });
});
//borrar imagen
rutas.delete('/:id/:name', autentificacion_middleware_1.verificarToken, (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    imagenes_model_1.Imagenes.findByIdAndRemove(id, (err, imgBorrar) => {
        if (err)
            throw err;
        res.json({
            ok: true,
            mensaje: 'Imagen eliminada satisfactoriamente',
            body: imgBorrar
        });
        fs_1.default.unlinkSync(path_1.default.resolve(__dirname, '../uploads', 'ciscolegrand', name));
    });
});
exports.default = rutas;
