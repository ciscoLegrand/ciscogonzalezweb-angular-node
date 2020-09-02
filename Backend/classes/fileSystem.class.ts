import path from 'path'
import fs from 'fs'

export default class FileSystem {
  constructor(){}

  guardarImagen(file: any, nombre: string) {
    return new Promise((resolve, reject) => {

      //crear carpeta
      const path = this.crearCarpeta(nombre)

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

  private crearCarpeta(nombre: string) {
    //construir path
    const pathImagenes = path.resolve(__dirname,'../uploads', nombre)

    const existePath = fs.existsSync(pathImagenes)

    if(!existePath) {fs.mkdirSync(pathImagenes)}

    return pathImagenes
  }

  getImgUrl(img: string){
    const pathImagen = path.resolve(__dirname,'../uploads', 'ciscolegrand', img)
    return pathImagen
  }
}