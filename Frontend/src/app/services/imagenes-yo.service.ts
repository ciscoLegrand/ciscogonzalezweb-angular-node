import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class ImagenesYoService {

  mostrarNombre = false

  imagenNombre: string
  imagenPath: string

  imagenSubir: File
  imagenSel: string | ArrayBuffer

  img1 = `${URL}/uploadimg/ciscolegrand/1a.jpg`
  img2 = `${URL}/uploadimg/ciscolegrand/2a.jpg`
  img3 = `${URL}/uploadimg/ciscolegrand/3a.jpg`
  img4 = `${URL}/uploadimg/ciscolegrand/4a.jpg`

  imgenesYo = [
    {
      img:`${URL}/uploadimg/ciscolegrand/1a.jpg`
    },
    {
      img: `${URL}/uploadimg/ciscolegrand/2a.jpg`
    },
    {
      img: `${URL}/uploadimg/ciscolegrand/3a.jpg`
    },
    {
      img: `${URL}/uploadimg/ciscolegrand/4a.jpg`
    }
  ]
  
  constructor() { }
}
