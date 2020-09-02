import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoticiaService } from 'src/app/services/noticia.service'
import { ImagenesYoService } from 'src/app/services/imagenes-yo.service';
import { Noticia, RespuestaNoticia } from 'src/app/interfaces/noticias.interface';
import { TooltipService } from 'src/app/services/tooltip.service';
declare let $:any

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: [
  ]
})
export class InicioComponent implements OnInit {

  mostrarYo = true

  noticias: Noticia[] = []


  constructor(
    private router: Router,
    public noticiasService: NoticiaService,
    public imagenesYo: ImagenesYoService,
    public tooltip: TooltipService
    ) { }

  ngOnInit(): void {
    setTimeout(() => {
      $( () => {
        this.tooltip.abrirTooltipHover()
      })
    },150)

    this.noticiasService.noticiaCompleta = false

    // Obtener 3 ultimas noticias
    this.noticiasService.getUltimasNoticias()
      .subscribe((res: RespuestaNoticia) => {
        this.noticias.push(...res.noticias.slice(0,3))        
      })
  }

  yoMostrar(){
    this.mostrarYo= !this.mostrarYo
  }

  //abrir modales
  tecnologias(){
    $('#modalTecnologias').modal()
  }

  sobreMi(){
    $('#sobreMi').modal()
  }

  mostrarNoticia(noticia: Noticia){
    this.tooltip.cerrarTooltip()

    this.noticiasService.noticiaCompleta = true

    this.noticiasService.noticiaSel = noticia
    
    setTimeout(() => {
      this.router.navigateByUrl('noticiaCompleta')
    },100)
  }
}
