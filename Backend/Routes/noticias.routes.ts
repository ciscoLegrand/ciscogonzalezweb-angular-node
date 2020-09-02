import { Router, Response } from "express";
import { verificarToken } from "../middlewares/autentificacion.middleware";
import FileSystemNoticias from "../classes/fileSystemNoticias.class";
import { Noticias } from "../models/noticias.model";


const noticiasRutas = Router()
const fileSystemNoticias = new FileSystemNoticias()

//Crear noticia
noticiasRutas.post('/:img/:imgYo', verificarToken, (req: any, res: Response) => {
  const body = req.body 
  const img = req.params.img 
  const imgYo = req.params.imgYo

  body.img = img
  body.imgYo = imgYo
  
  Noticias.create(body)
    .then(noticiaDB => {
      res.json({
        ok: true,
        noticia: noticiaDB
      })

    })
    .catch(err => {
      res.json(err)
    })
})

//Obtener noticias paginadas
noticiasRutas.get('/', async (req: any, res: Response) => {
  //paginar noticias
  //se guarda el numero de pagina pasado por parametro o por defecto la primera pagina
  let pagina = Number(req.query.pagina) || 1
  //para saber que mostrar le restamos 1 a la pagina indicada, o se va a la pagina 1
  let saltar = pagina - 1
  // 8 seran las noticias a mostrar, para evitar las noticias de las otras paginas a evitar
  // multiplicamos la pagina enviada x params -1 por 8 para que nos devuelva las noticias a partir de registro resultante
  saltar = saltar * 8 
  // query que ordena las entradas mas nuevas primero, 
  //ejemplo: tenemos 20 noticias, la pg 1 mostrara 8noticias
  // la pagina 2: de la noticia 9 a la 16 etc siempre empezando por los registros mas nuevos
  
  const noticias = await Noticias.find()
                    .sort({_id: -1})
                    .skip(saltar)
                    .limit(8)
                    .exec()

  res.json({
    ok: true,
    pagina,
    noticias
  })
});

//subir imagenesYo
noticiasRutas.post('/upload1', verificarToken, async (req:any, res: Response) => {
  const file1 = req.files.imgYo 
  await fileSystemNoticias.guardarImgYo(file1)

  res.json({
    ok: true,
    file1: file1.name
  })
})

//subir imagenesNoticia
noticiasRutas.post('/upload2', verificarToken, async (req:any, res: Response) => {
  const file2 = req.files.img 
  await fileSystemNoticias.guardarImagenNoticia(file2)

  res.json({
    ok: true,
    file2: file2.name
  })
})

//mostrar imagen noticia por URL
noticiasRutas.get('/imgNoticia/:img', (req:any, res: Response) => {
  const img = req.params.img 
  const pathImagen = fileSystemNoticias.getImgNoticiaUrl(img)
  res.sendFile(pathImagen)
})

//mostrar imagenYo por URL
noticiasRutas.get('/imgYo/:img', (req:any, res: Response) => {
  const img = req.params.img 
  const pathImagen = fileSystemNoticias.getImgYoUrl(img)
  res.sendFile(pathImagen)
})

export default noticiasRutas