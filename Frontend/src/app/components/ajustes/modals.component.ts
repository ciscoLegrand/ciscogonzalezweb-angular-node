import { Component, OnInit } from '@angular/core';
import { ImagenesYoService } from 'src/app/services/imagenes-yo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { TecnologiasSobreMiService } from 'src/app/services/tecnologias-sobre-mi.service';

declare let $: any

const URL = environment.url


@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styles: [
  ]
})
export class ModalsComponent implements OnInit {

  constructor(
    public imagenYoService: ImagenesYoService,
    public usuarioService: UsuarioService,
    public http: HttpClient,
    public tecSobre: TecnologiasSobreMiService
  ) { }

  ngOnInit(): void {
  }

  seleccionImg(archivo: File) {
    this.imagenYoService.imagenSubir = archivo
    this.imagenYoService.mostrarNombre = true

    const reader = new FileReader()

    reader.onload = () => this.imagenYoService.imagenSel = reader.result
    reader.readAsDataURL(archivo)
  }

  cambiarMostrar() {
    this.imagenYoService.mostrarNombre = false
  }

  actualizarImagenYo() {
    if (this.imagenYoService.imagenNombre !== this.imagenYoService.imagenSubir.name) {
      $('#imagen').modal('hide')
      this.cambiarMostrar()
    } else {
      const headers = {
        miToken: this.usuarioService.token
      }

      const formData = new FormData()
      formData.append('img', this.imagenYoService.imagenSubir, this.imagenYoService.imagenSubir.name)

      return this.http.post(`${URL}/uploadimg/update`, formData, { headers })
        .subscribe(res => {
          setTimeout(() => {
            $('#imagen').modal('hide')
          }, 100)
          this.cambiarMostrar()
          const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 3000
          })

          Toast.fire({
            title: 'Imagen actualizada correctamente!',
            background: 'rgb(233,233,0)'
          })
        })
    }
  }

  actualizarTec(f: NgForm) {
    this.tecSobre.actualizarTecnologia(this.tecSobre.tecSel, this.tecSobre.tecSel._id)
    $('#tecnologia').modal('hide')

    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000
    })

    Toast.fire({
      title: 'Tecnologia actualizada correctamente!',
      background: 'rgb(233,233,0)'
    })
  }
}
