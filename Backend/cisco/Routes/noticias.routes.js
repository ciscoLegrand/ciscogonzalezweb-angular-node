"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autentificacion_middleware_1 = require("../middlewares/autentificacion.middleware");
const fileSystemNoticias_class_1 = __importDefault(require("../classes/fileSystemNoticias.class"));
const noticias_model_1 = require("../models/noticias.model");
const noticiasRutas = express_1.Router();
const fileSystemNoticias = new fileSystemNoticias_class_1.default();
//Crear noticia
noticiasRutas.post('/:img/:imgYo', autentificacion_middleware_1.verificarToken, (req, res) => {
    const body = req.body;
    const img = req.params.img;
    const imgYo = req.params.imgYo;
    body.img = img;
    body.imgYo = imgYo;
    noticias_model_1.Noticias.create(body)
        .then(noticiaDB => {
        res.json({
            ok: true,
            noticia: noticiaDB
        });
    })
        .catch(err => {
        res.json(err);
    });
});
//Obtener noticias paginadas
noticiasRutas.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    //paginar noticias
    //se guarda el numero de pagina pasado por parametro o por defecto la primera pagina
    let pagina = Number(req.query.pagina) || 1;
    //para saber que mostrar le restamos 1 a la pagina indicada, o se va a la pagina 1
    let saltar = pagina - 1;
    // 8 seran las noticias a mostrar, para evitar las noticias de las otras paginas a evitar
    // multiplicamos la pagina enviada x params -1 por 8 para que nos devuelva las noticias a partir de registro resultante
    saltar = saltar * 8;
    // query que ordena las entradas mas nuevas primero, 
    //ejemplo: tenemos 20 noticias, la pg 1 mostrara 8noticias
    // la pagina 2: de la noticia 9 a la 16 etc siempre empezando por los registros mas nuevos
    const noticias = yield noticias_model_1.Noticias.find()
        .sort({ _id: -1 })
        .skip(saltar)
        .limit(8)
        .exec();
    res.json({
        ok: true,
        pagina,
        noticias
    });
}));
//subir imagenesYo
noticiasRutas.post('/upload1', autentificacion_middleware_1.verificarToken, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const file1 = req.files.imgYo;
    yield fileSystemNoticias.guardarImgYo(file1);
    res.json({
        ok: true,
        file1: file1.name
    });
}));
//subir imagenesNoticia
noticiasRutas.post('/upload2', autentificacion_middleware_1.verificarToken, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const file2 = req.files.img;
    yield fileSystemNoticias.guardarImagenNoticia(file2);
    res.json({
        ok: true,
        file2: file2.name
    });
}));
//mostrar imagen noticia por URL
noticiasRutas.get('/imgNoticia/:img', (req, res) => {
    const img = req.params.img;
    const pathImagen = fileSystemNoticias.getImgNoticiaUrl(img);
    res.sendFile(pathImagen);
});
//mostrar imagenYo por URL
noticiasRutas.get('/imgYo/:img', (req, res) => {
    const img = req.params.img;
    const pathImagen = fileSystemNoticias.getImgYoUrl(img);
    res.sendFile(pathImagen);
});
exports.default = noticiasRutas;
