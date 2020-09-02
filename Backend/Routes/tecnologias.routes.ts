import { Router, Response } from 'express'
import { verificarToken } from '../middlewares/autentificacion.middleware'
import { Tecnologias } from '../models/tecnologias.model'

const tecnologiasRutas = Router()

//crear tecnologias
tecnologiasRutas.post('/', verificarToken, (req: any, res: Response) => {
  const body = req.body 
  
  Tecnologias.create(body)
    .then(tecnologiaDB => {
      res.json({
        ok: true,
        tecnologia: tecnologiaDB
      })
    })
    .catch(err => {
      res.json(err)
    })
})

//Actualizar tecnologias
tecnologiasRutas.post('/update/:id', verificarToken, (req: any, res: Response) => {
  const id = req.params.id
  
  const tecnologia = {
    icono: req.body.icono,
    tecnologia: req.body.tecnologia,
    experiencia: req.body.experiencia
  }
  //{new: true} -> borra el anterior registro y añade uno nuevo a modo de actualización
  Tecnologias.findByIdAndUpdate(id, tecnologia, {new: true}, (err, tecnologiaDB) => {
    if(err) throw err
    if(!tecnologiaDB){
      return res.json({
        ok: false,
        mensaje: 'Invalid data'
      })
    }
    res.json({
      ok: true,
      tecnologia
    })
  })
})

//obtener tecnologias
tecnologiasRutas.get('/', async (req: any, res: Response) => {
  const tecnologias = await Tecnologias.find()
                    .sort({_id: -1})
                    .exec()

  res.json({
    ok: true,
    tecnologias
  })
});

export default tecnologiasRutas