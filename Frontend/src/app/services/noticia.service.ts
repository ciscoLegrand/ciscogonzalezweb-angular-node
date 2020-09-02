import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { RespuestaNoticia } from '../interfaces/noticias.interface';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  noticiaSel: any

  noticiaCompleta = false
  
  pagina = 1

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  getUltimasNoticias(){
    return this.http.get<RespuestaNoticia>(`${URL}/noticias/?pagina=1`)
  }

  getUltimasNoticias2(){
    return this.http.get<RespuestaNoticia>(`${URL}/noticias/?pagina=${this.pagina}`)
  }

  getNoticiasPaginadasMas(){
    this.pagina++
    return this.http.get<RespuestaNoticia>(`${URL}/noticias/?pagina=${this.pagina}`)
  }

  getNoticiasPaginadasMenos(){
    if(this.pagina <= 1){
      this.pagina = 1
    }else{
      this.pagina--
    }
    return this.http.get<RespuestaNoticia>(`${URL}/noticias/?pagina=${this.pagina}`)
  }

  crearNoticia(
    titulo: string,
    subtitulo: string,
    autor: string,
    img: string,
    imgYo: string,
    texto1: string,
    texto2: string,
    texto3: string,
    texto4: string,
    texto5: string
  ) {
    const headers = {
      miToken: this.usuarioService.token
    }

    const data = { titulo, subtitulo, autor, img, imgYo, texto1, texto2, texto3, texto4, texto5 }

    return this.http.post<RespuestaNoticia>(`${URL}/noticias/${img}/${imgYo}`, data, { headers }).subscribe()
  }
}
