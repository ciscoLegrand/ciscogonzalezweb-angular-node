import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NoticiaService } from 'src/app/services/noticia.service';
import { TooltipService } from 'src/app/services/tooltip.service';
const URL = environment.url;

@Component({
  selector: 'app-crear-noticia',
  templateUrl: './crear-noticia.component.html',
  styles: []
})
export class CrearNoticiaComponent implements OnInit {

  //imagenes para subir al servidor
  imagenNoticiaSubir: File;
  imagenYoSubir: File;

  imagenSel1: string | ArrayBuffer;
  imagenSel2: string | ArrayBuffer;

  //para mostrar o no las distintas partes del formulario
  mostrarNombre = false;
  mostrarImagenNoticia = false;
  mostrarImagenYo = false;
  mostrarYo = true;
  mostrarNoticia = true;
  mostrarFormNoticia = false;

  noticia = {
    titulo: '',
    subtitulo: '',
    autor: '',
    img: '',
    imgYo: '',
    texto1: '',
    texto2: '',
    texto3: '',
    texto4: '',
    texto5: ''
  };


  constructor(
    public usuarioService: UsuarioService,
    private http: HttpClient,
    public noticiasService: NoticiaService,
    public tooltip: TooltipService
  ) { }

  ngOnInit(): void {
  }

  ocultarBoton() {
    this.mostrarNoticia = false;
    this.tooltip.settings = false
    this.tooltip.settings2 = false
  }

  seleccionImgNoti(archivo: File) {
    this.imagenNoticiaSubir = archivo;
    this.mostrarImagenNoticia = true;
    this.mostrarYo = false;
    const reader = new FileReader();
    reader.onload = () => this.imagenSel1 = reader.result;
    reader.readAsDataURL(archivo);
  }

  seleccionImgYo(archivo: File) {
    this.imagenYoSubir = archivo;
    this.mostrarImagenYo = true;
    const reader = new FileReader();
    reader.onload = () => this.imagenSel2 = reader.result;
    reader.readAsDataURL(archivo);
  }

  subirImagenYo() {
    const headers = {
      miToken: this.usuarioService.token
    };

    const formData = new FormData();
    formData.append('imgYo', this.imagenYoSubir, this.imagenYoSubir.name);
    return this.http
      .post(`${URL}/noticias/upload1`, formData, { headers })
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  subirImagenNoticia() {
    const headers = {
      miToken: this.usuarioService.token
    };

    const formData = new FormData();
    formData.append('img', this.imagenNoticiaSubir, this.imagenNoticiaSubir.name);
    return this.http
      .post(`${URL}/noticias/upload2`, formData, { headers })
      .subscribe(res => {
        console.log(res);
      });
  }

  forularioNoticia() {
    this.mostrarFormNoticia = true;
  }

  salirNoticia() {
    this.mostrarFormNoticia = false;
    this.mostrarNoticia = true;
    this.mostrarYo = true;
    this.mostrarImagenNoticia = false;
    this.mostrarImagenYo = false;

    this.tooltip.settings = true
    this.tooltip.settings2 = true
    window.scrollTo(0, 0)
  }

  //funcion para mandar el formulario
  crearNoticia(f: NgForm) {
    this.subirImagenNoticia();
    this.subirImagenYo();
    this.salirNoticia();

    this.noticiasService.crearNoticia(
      this.noticia.titulo,
      this.noticia.subtitulo,
      this.noticia.autor,
      this.imagenNoticiaSubir.name,
      this.imagenYoSubir.name,
      this.noticia.texto1,
      this.noticia.texto2,
      this.noticia.texto3,
      this.noticia.texto4,
      this.noticia.texto5);

    this.tooltip.settings = true
    this.tooltip.settings2 = true
    window.scrollTo(0, 0)
    //vaciar el formulario
    this.noticia = null;

    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 2000
    });
    Toast.fire({
      title: 'Noticia creada correctamente',
      background: 'yellow'
    });
  }

}
