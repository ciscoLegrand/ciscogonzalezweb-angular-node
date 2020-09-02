import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { NgForm } from '@angular/forms';
import Swal from  'sweetalert2'
import { UsuarioService } from 'src/app/services/usuario.service';
import { MensajesService } from 'src/app/services/mensajes.service';
declare let $:any

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styles: []
})
export class ModalsComponent implements OnInit {

  mensaje= {
    email: '',
    mensaje: ''
  }

  //cambiar en prod -> prueba simple
  usuarioLogin = {
    nombre: '',
    password: ''
  }

  constructor(
    public modalService: ModalService,
    public ususarioService: UsuarioService,
    public mensajes: MensajesService
  ) {
    this.modalService.privacidadSeleccionada = true;
  }

  ngOnInit(): void { }

  politicaPrivacidad() {
    this.modalService.politicaPrivacidad();
  }

  cambioPrivacidad() {
    this.modalService.cambioPrivacidad();
  }

  contacto() {
    this.modalService.contacto();
  }

  contactoFede(f: NgForm){
    if(f.invalid){
      $('#contacto').modal('hide')

      this.limpiarMensaje()

      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer:3000
      })
      
      Toast.fire({
        title: 'Todos los campos son obligatorios',
        background: 'rgb(233,233,0)',
        icon: 'error'
      })
    }else{
      $('#contacto').modal('hide')
      this.mensajes.crearMensaje(this.mensaje.email, this.mensaje.mensaje)

      this.limpiarMensaje()
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer:3000
      })
      
      Toast.fire({
        title: 'Mensaje enviado correctamente',
        background: 'rgb(233,233,0)',
        icon: 'success'
      })
    }
  }

  limpiarMensaje(){
    this.mensaje.email=''
    this.mensaje.mensaje=''
  }

  limpiarUsuario(){
    this.usuarioLogin.nombre =''
    this.usuarioLogin.password=''
  }

  salirLogin(){
    $('#loginModal').modal('hide')
  }

  async login(forma: NgForm) {
    if(forma.invalid){
      this.salirLogin()
    }

    const ususarioValido = await this.ususarioService.login(this.usuarioLogin.nombre, this.usuarioLogin.password)

    if(ususarioValido){
      this.salirLogin()
      this.ususarioService.autentificado = true//guard
      
      setTimeout(() => {
        $('navbar-collapse').collapse('hide')
      },1000)

      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer:3000
      })
      
      Toast.fire({
        title: `Bienvenido ${this.usuarioLogin.nombre}, ahora estas conectado`,
        background: 'rgb(233,233,0)',
        icon: 'success'
      })

      this.limpiarUsuario()
      this.modalService.online = true
    }else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer:3000
      })
      
      Toast.fire({
        title: 'Invalid data',
        background: 'rgb(233,233,0)',
        icon: 'error'
      })

      $('navbar-collapse').collapse('hide')

      this.salirLogin()

      this.limpiarUsuario()
    }
  }
}