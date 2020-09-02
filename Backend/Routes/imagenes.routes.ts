import { Router, Response } from "express";
import { verificarToken } from "../middlewares/autentificacion.middleware";
import { Imagenes } from "../models/imagenes.model";
import FileSystem from "../classes/fileSystem.class";
import  fs from 'fs'
import path from 'path'

const rutas = Router()
const fileSystemImg = new FileSystem()
//subir imagenes
rutas.post('/', verificarToken, (req: any, res: Response) => {
  const body = req.body 
  const file = req.files.img 
  body.img = file.name
  console.log(file);
  
  Imagenes.create(body)
    .then(imgDB => {
      res.json({
        ok: true,
        imgDB
      })

      fileSystemImg.guardarImagen(file, req.usuario.nombre)
    })
    .catch(err => {
      res.json(err)
    })
})

//mostrar imagen por URL
rutas.get('/ciscolegrand/:img', (req:any, res: Response) => {
  const img = req.params.img 
  const pathImagen = fileSystemImg.getImgUrl(img)
  res.sendFile(pathImagen)
})

//actualizar imagen
rutas.post('/update', verificarToken, (req: any, res: Response) => {
  const file = req.files.img 
  fileSystemImg.guardarImagen(file, req.usuario.nombre)
  res.json({
    ok: true,
    mensaje: 'Imagen actualizada con exito'
  })
})

//borrar imagen
rutas.delete('/:id/:name', verificarToken, (req: any, res: Response) => {
  const id = req.params.id 
  const name = req.params.name 

  Imagenes.findByIdAndRemove(id, (err, imgBorrar) => {
    if(err) throw err
    res.json({
      ok: true,
      mensaje: 'Imagen eliminada satisfactoriamente',
      body: imgBorrar
    })

    fs.unlinkSync(path.resolve(__dirname,'../uploads', 'ciscolegrand', name))
  })
})

export default rutas