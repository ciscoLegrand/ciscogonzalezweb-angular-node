"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileSystemNoticias {
    constructor() { }
    //imagen noticia
    guardarImgYo(file) {
        return new Promise((resolve, reject) => {
            //crear carpeta
            const path = this.crearCarpetaImagenYo();
            // nombre del archivo
            const nombreArchivo = file.name;
            //mover el archivo
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
    crearCarpetaImagenYo() {
        //construir path
        const pathImagenNoticia = path_1.default.resolve(__dirname, '../uploads/imgYo');
        const existePath = fs_1.default.existsSync(pathImagenNoticia);
        if (!existePath) {
            fs_1.default.mkdirSync(pathImagenNoticia);
        }
        return pathImagenNoticia;
    }
    getImgNoticiaUrl(img) {
        const pathImgNoticia = path_1.default.resolve(__dirname, '../uploads', 'imgNoticia', img);
        return pathImgNoticia;
    }
    // imagenYo
    guardarImagenNoticia(file) {
        return new Promise((resolve, reject) => {
            //crear carpeta
            const path = this.crearCarpetaImagenNoticia();
            // nombre del archivo
            const nombreArchivo = file.name;
            //mover el archivo
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
    crearCarpetaImagenNoticia() {
        //construir path
        const pathImagenYo = path_1.default.resolve(__dirname, '../uploads/imgNoticia');
        const existePath = fs_1.default.existsSync(pathImagenYo);
        if (!existePath) {
            fs_1.default.mkdirSync(pathImagenYo);
        }
        return pathImagenYo;
    }
    getImgYoUrl(img) {
        const pathImagenYo = path_1.default.resolve(__dirname, '../uploads', 'imgYo', img);
        return pathImagenYo;
    }
}
exports.default = FileSystemNoticias;
