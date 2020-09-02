import { Component, OnInit } from '@angular/core';
import { ImagenesYoService } from 'src/app/services/imagenes-yo.service';
import { Foto } from 'src/app/interfaces/foto.interface'
import { TecnologiasSobreMiService } from 'src/app/services/tecnologias-sobre-mi.service';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { TooltipService } from 'src/app/services/tooltip.service';

declare let $: any

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styles: [
  ]
})
export class AjustesComponent implements OnInit {

  fotoSel: Foto

  tecnologiasDestacadas: string[] = []

  sobreMiBackend: any

  constructor(
    public imagenYoService: ImagenesYoService,
    public tecSobre: TecnologiasSobreMiService,
    public tooltip: TooltipService
  ) { }

  ngOnInit(): void {
    this.tooltip.abrirTooltip()

    //tooltip tecnologias
    setTimeout(() => {
      this.tooltip.abrirTooltipHover
    }, 150)

    this.tecSobre.getTecnologia().subscribe((res: any) => {
      this.tecnologiasDestacadas.push(...res.tecnologias)
    })

    this.tecSobre.getSobreMi().subscribe(async (res: any) => {
      this.sobreMiBackend = await res.sobreMi[0]
    })
  }

  editarImgYo(img: Foto) {
    this.fotoSel = img

    if (this.fotoSel.img === this.imagenYoService.img1) {
      //abrir modal de ajustes
      $('#imagen').modal()
      this.imagenYoService.imagenNombre = '1a.jpg'
      this.imagenYoService.imagenPath = this.fotoSel.img
      this.tooltip.cerrarTooltip()
    }

    if (this.fotoSel.img === this.imagenYoService.img2) {
      //abrir modal de ajustes
      $('#imagen').modal()
      this.imagenYoService.imagenNombre = '2a.jpg'
      this.imagenYoService.imagenPath = this.fotoSel.img
      this.tooltip.cerrarTooltip()
    }

    if (this.fotoSel.img === this.imagenYoService.img3) {
      //abrir modal de ajustes
      $('#imagen').modal()
      this.imagenYoService.imagenNombre = '3a.jpg'
      this.imagenYoService.imagenPath = this.fotoSel.img
      this.tooltip.cerrarTooltip()
    }

    if (this.fotoSel.img === this.imagenYoService.img4) {
      //abrir modal de ajustes
      $('#imagen').modal()
      this.imagenYoService.imagenNombre = '4a.jpg'
      this.imagenYoService.imagenPath = this.fotoSel.img
      this.tooltip.cerrarTooltip()
    }
  }

  editarTec(tec: string) {
    this.tecSobre.mostrarTec = true
    this.tecSobre.tecSel = tec

    this.tooltip.cerrarTooltip()

    setTimeout(() => {
      $('#tecnologia').modal()
    }, 100)
  }

  actualizarSobreMi() {
    this.tecSobre.mostrarSobreMi = true
    //ocultar botones de ajustes y que solo se vea  actualizar sobre mi
    this.tooltip.settings = false
    this.tooltip.settings3 = false
  }

  actualizarSobreMiFull(f: NgForm) {
    this.tecSobre.actualizarSobreMi(this.sobreMiBackend, this.sobreMiBackend._id)

    this.tecSobre.mostrarSobreMi = false

    this.tooltip.settings = true
    this.tooltip.settings3 = true
    window.scrollTo(0, 0)

    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    })

    Toast.fire({
      title: 'SobreMi actualizado correctamente!',
      background: 'rgb(233,233,0)'
    })
  }

  cerrarSobreMi() {
    this.tecSobre.mostrarSobreMi = false
    this.tooltip.settings = true
    this.tooltip.settings3 = true
    window.scrollTo(0, 0)
  }
}
