import { Router, Request, Response } from "express";
import { Usuario } from "../models/usuario.model";
import bcrypt from "bcryptjs"
import Token from "../classes/token.class";
import { verificarToken } from "../middlewares/autentificacion.middleware";


const usuarioRutas = Router()

// crear usuario
usuarioRutas.post('/crear', (req: Request, res: Response) => {
  const usuario = {
    nombre: req.body.nombre,
    password: bcrypt.hashSync(req.body.password, 10)
  }

  //gurdar datos en bd
  Usuario.create(usuario)
    .then(usuarioDB => {
      res.json({
        ok: true,
        usuario: usuarioDB
      })
    })
    .catch(err => {
      res.json({
        ok: false,
        err
      })
    })
})


// Login
usuarioRutas.post('/entrar', (req: Request, res: Response) => {
  const body = req.body

  Usuario.findOne({ nombre: body.nombre}, (err, usuarioBD) => {
    if(err) throw err
    if(!usuarioBD){
      return res.json({
        ok: false,
        mensaje: 'Invalid data'
      })
    }

    if(usuarioBD.compararContrasena(body.password)) {

      // se declara la información que queremos que lleve el token
      const miToken = Token.getToken({      
        _id: usuarioBD._id,
        nombre: usuarioBD.nombre,
        password: usuarioBD.password
      })

      res.json({
        ok: true,
        token: miToken
      })
    }else{
      return res.json({
        ok: false,
        mensaje: 'Invalid password'
      })
    }
  })
})

// Actualizar mi usuario
usuarioRutas.post('/update', verificarToken, (req: any, res: Response) => {

  const usuario = {
      nombre: req.body.nombre || req.usuario.nombre,
      password: req.body.password || req.usuario.password
  }

  Usuario.findByIdAndUpdate(req.usuario._id, usuario, { new: true }, (err, userDB) => {

      if (err) throw err;
      if (!userDB) {
          return res.json({
              ok: false,
              mensaje: 'Invalid data'
          });
      }
      const miToken = Token.getToken({
          _id: userDB._id,
          nombre: userDB.nombre,
          password: userDB.password

      });
      res.json({
          ok: true,
          token: miToken
      });
  });
});

// Get usuario
usuarioRutas.get('/', async (req: any, res: Response) => {

  const user = await Usuario.find()
      .limit(1) // Limit es para el número de usuarios que queremos obtener
      .exec();

  res.json({
      ok: true,
      user
  });
});

export default usuarioRutas