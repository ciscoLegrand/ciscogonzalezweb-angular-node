import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2'
import { MensajesService } from 'src/app/services/mensajes.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TooltipService } from 'src/app/services/tooltip.service';


declare let $: any

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  ojo = true
  login1: boolean
  input1:boolean
  clave = '' 
  
  constructor(
    public modalService: ModalService,  
    public mensajes: MensajesService,
    public usuarioService: UsuarioService,
    public tooltip: TooltipService
  ) {
    this.modalService.ojo2 =true
  }

  ngOnInit(): void {
    this.mensajes.sumaMensajes()
  }

  cerrarNavbar() {
    $('.navbar-collapse').collapse('hide')
    this.login1 = false
    this.input1 = false
    window.scrollTo(0, 0)
  }

  alerta() {
    $('#alerta').modal();
    this.cerrarNavbar();
  }

  onClick1(){
    this.ojo = false
    this.login1 =false
    this.tooltip.abrirTooltip()
  }

  onClick2(){
    this.ojo = true
    this.login1 = true
    this.modalService.ojo2 = false
    this.tooltip.abrirTooltip()
  }

  entrar(){
    this.login1 = false
    this.input1 = true

    $(document).ready(() => {      
      $('#focusClave').trigger('focus');
    });

    this.tooltip.cerrarTooltip()
  }

  inputLogin(){
    if(this.clave!== this.usuarioService.pass){
      this.login1 = false
      this.input1 = false
      this.clave = ''
      this.cerrarNavbar()
    }else{
      this.login1 = false
      this.input1 = false
      this.clave = ''
      this.cerrarNavbar()
      //abrir el modal de login
      $('#loginModal').modal()
      $(document).ready(() => {
        $('#loginModal').on('shown.bs.modal', () => {
          $('#focusLogin').trigger('focus');
        });
      });
    }
  }

  logOut(){    
    this.usuarioService.logOut()

    this.cerrarNavbar()
    this.modalService.logOut()

    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer:3000
    })
    
    Toast.fire({
      title: 'Cerrando sesion' ,
      background: 'rgb(233,233,0)',
      icon: 'success'
    })
  }
}
