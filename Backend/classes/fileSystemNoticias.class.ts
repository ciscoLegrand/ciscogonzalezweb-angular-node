import path from 'path'
import fs from 'fs'

export default class FileSystemNoticias {
  constructor(){}

  //imagen noticia
  guardarImgYo(file: any) {
    return new Promise((resolve, reject) => {

      //crear carpeta
      const path = this.crearCarpetaImagenYo()

      // nombre del archivo
      const nombreArchivo = file.name

      //mover el archivo
      file.mv(`${path}/${nombreArchivo}`, (err: any) => {
        if(err) {
          reject()
        } else{
          resolve() 
        }
      })
    })
  }

  private crearCarpetaImagenYo() {
    //construir path
    const pathImagenNoticia = path.resolve(__dirname,'../uploads/imgYo')

    const existePath = fs.existsSync(pathImagenNoticia)

    if(!existePath) {fs.mkdirSync(pathImagenNoticia)}

    return pathImagenNoticia
  }

  getImgNoticiaUrl(img: string){
    const pathImgNoticia = path.resolve(__dirname,'../uploads', 'imgNoticia', img)
    return pathImgNoticia
  }

  // imagenYo
  guardarImagenNoticia(file: any) {
    return new Promise((resolve, reject) => {

      //crear carpeta
      const path = this.crearCarpetaImagenNoticia()

      // nombre del archivo
      const nombreArchivo = file.name

      //mover el archivo
      file.mv(`${path}/${nombreArchivo}`, (err: any) => {
        if(err) {
          reject()
        } else{
          resolve() 
        }
      })
    })
  }

  private crearCarpetaImagenNoticia() {
    //construir path
    const pathImagenYo = path.resolve(__dirname,'../uploads/imgNoticia')

    const existePath = fs.existsSync(pathImagenYo)

    if(!existePath) {fs.mkdirSync(pathImagenYo)}

    return pathImagenYo
  }

  getImgYoUrl(img: string){
    const pathImagenYo = path.resolve(__dirname,'../uploads', 'imgYo', img)
    return pathImagenYo
  }
}