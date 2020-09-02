"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileSystem {
    constructor() { }
    guardarImagen(file, nombre) {
        return new Promise((resolve, reject) => {
            //crear carpeta
            const path = this.crearCarpeta(nombre);
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
    crearCarpeta(nombre) {
        //construir path
        const pathImagenes = path_1.default.resolve(__dirname, '../uploads', nombre);
        const existePath = fs_1.default.existsSync(pathImagenes);
        if (!existePath) {
            fs_1.default.mkdirSync(pathImagenes);
        }
        return pathImagenes;
    }
    getImgUrl(img) {
        const pathImagen = path_1.default.resolve(__dirname, '../uploads', 'ciscolegrand', img);
        return pathImagen;
    }
}
exports.default = FileSystem;
