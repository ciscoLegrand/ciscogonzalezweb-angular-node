import { Response,NextFunction } from 'express'
import Token from '../classes/token.class'

export const verificarToken = (req: any, res: Response, next: NextFunction) => {
  const usuarioToken = req.get('miToken') || ''

  Token.comprobarToken(usuarioToken)
    .then((decoded: any) => {
      req.usuario = decoded.usuario
      next()
    })
    .catch((err) => {
      res.json({
        ok: false,
        mensaje: 'Token invalido',
        err
      })
    })
}