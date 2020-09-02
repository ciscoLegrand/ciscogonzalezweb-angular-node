import Server from './classes/server.class'
import fileupload from 'express-fileupload'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'

import usuarioRutas from './Routes/usuario.routes'
import contactoRutas from './Routes/contacto.routes'
import imgRutas from './Routes/imagenes.routes'
import sobreMiRutas from './Routes/sobreMi.routes'
import tecnologiasRutas from './Routes/tecnologias.routes'
import noticiasRutas from './Routes/noticias.routes'


const server = new Server()
const { PORT,MONGO_URI_PROD,MONGO_URI_DEV} = require('./config')
// BodyParser
server.app.use(bodyParser.urlencoded({extended: true}))
server.app.use(bodyParser.json())

//cors
server.app.use(cors({origin: true, credentials: true}))

// fileupload
server.app.use(fileupload())

// Rutas
server.app.use('/usuario', usuarioRutas)
server.app.use('/contacto', contactoRutas)
server.app.use('/uploadimg', imgRutas)
server.app.use('/sobremi', sobreMiRutas)
server.app.use('/tecnologia', tecnologiasRutas)
server.app.use('/noticias', noticiasRutas)

//conexion base de datos
let mongoDB: string

// if(process.env.NODE_ENV === 'production'){
//   mongoDB = MONGO_URI_PROD
// }else {
//   mongoDB = MONGO_URI_DEV
// }

process.env.NODE_ENV === 'production' ? 
  mongoDB = MONGO_URI_PROD : 
  mongoDB =MONGO_URI_DEV

mongoose
  .connect( mongoDB, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
  },
  (err) => {
    if(err) throw 'err'
    console.log(`Conectado a la base de datos: ${mongoDB} `); 
  }
)

// levantamos el servidor
server.start(() => {
  console.log(`Servidor CISCO corriendo en http://localhost:${PORT}`)
})