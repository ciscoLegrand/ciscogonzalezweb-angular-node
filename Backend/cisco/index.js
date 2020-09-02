"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const server_class_1 = __importDefault(require("./classes/server.class"));
const usuario_routes_1 = __importDefault(require("./Routes/usuario.routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const contacto_routes_1 = __importDefault(require("./Routes/contacto.routes"));
const imagenes_routes_1 = __importDefault(require("./Routes/imagenes.routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const sobreMi_routes_1 = __importDefault(require("./Routes/sobreMi.routes"));
const tecnologias_routes_1 = __importDefault(require("./Routes/tecnologias.routes"));
const noticias_routes_1 = __importDefault(require("./Routes/noticias.routes"));
const cors_1 = __importDefault(require("cors"));
const server = new server_class_1.default();
const { PORT, MONGO_URI_PROD, MONGO_URI_DEV } = require('./config');
// BodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
// fileupload
server.app.use(express_fileupload_1.default());
// Rutas
server.app.use('/usuario', usuario_routes_1.default);
server.app.use('/contacto', contacto_routes_1.default);
server.app.use('/uploadimg', imagenes_routes_1.default);
server.app.use('/sobremi', sobreMi_routes_1.default);
server.app.use('/tecnologia', tecnologias_routes_1.default);
server.app.use('/noticias', noticias_routes_1.default);
//conexion base de datos
let mongoDB;
// if(process.env.NODE_ENV === 'production'){
//   mongoDB = MONGO_URI_PROD
// }else {
//   mongoDB = MONGO_URI_DEV
// }
process.env.NODE_ENV === 'production' ?
    mongoDB = MONGO_URI_PROD :
    mongoDB = MONGO_URI_DEV;
mongoose_1.default
    .connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err)
        throw 'err';
    console.log('Conectado a la base de datos');
});
// levantamos el servidor
server.start(() => {
    console.log(`Servidor CISCO corriendo en http://localhost:${process.env.PORT}`);
});
