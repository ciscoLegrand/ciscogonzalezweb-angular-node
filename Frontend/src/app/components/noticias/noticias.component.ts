import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/app/services/noticia.service';
import { Router } from '@angular/router';
import { Noticia, RespuestaNoticia } from 'src/app/interfaces/noticias.interface';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styles: [
  ]
})
export class NoticiasComponent implements OnInit {
  //importamos interfaz de noticias
  noticias: Noticia[] = []
  paginaLength = true

  constructor(
    public noticiasService: NoticiaService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.noticiasService.noticiaCompleta = false

    // Obtener 3 ultimas noticias
    this.noticiasService.getUltimasNoticias2()
    .subscribe((res: RespuestaNoticia) => {
      this.noticias.push(...res.noticias)        
    })
  }

  mostrarNoticia(noticia: any){
    this.noticiasService.noticiaSel = noticia
    this.noticiasService.noticiaCompleta = true
    this.router.navigateByUrl('/noticiaCompleta')
  }

  restar(){
    this.paginaLength =true
    this.noticiasService.getNoticiasPaginadasMenos()
      .subscribe((res: RespuestaNoticia) => {
        this.noticias = res.noticias
      })
    window.scrollTo(0, 0)
  }
  
  sumar(){
    this.noticiasService.getNoticiasPaginadasMas()
    .subscribe((res: RespuestaNoticia) => {
      this.noticias = res.noticias
      if( res.noticias.length !== 8) {
        this.paginaLength = false
      }
      if (res.noticias.length === 0){
        this.restar()
        this.paginaLength = false
      }
    })
    window.scrollTo(0, 0)
  }
}
