import { Injectable } from '@angular/core';
declare let $: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  privacidad: boolean;
  privacidadSeleccionada: boolean;
  online: boolean
  ojo2: boolean
  //Inicio

  mostrar1 = true
  mostrar2 = false
  mostrar3 = false

  clase1 = 'btn-warning'
  clase2 = 'btn-outline-warning'
  clase3 = 'btn-outline-warning'

  constructor() { }

  politicaPrivacidad() {
    this.privacidad = false;
    this.privacidadSeleccionada = true;
    $('input[type="checkbox"]').prop('checked', false);
    $('#alerta').modal('hide');
    setTimeout(() => {
      $('#privacidad').modal();
    }, 500);
  }

  cambioPrivacidad() {
    this.privacidadSeleccionada = !this.privacidadSeleccionada;
  }

  contacto() {
    setTimeout(() => {
      $('input[type="checkbox"]').prop('checked', false);
      this.privacidadSeleccionada = true;
    }, 100);
    $('#alerta').modal('hide');
    // Abrir modal contacto y cerrar modal alerta
    setTimeout(() => {
      $('#contacto').modal()
    }, 500)
    $(document).ready(() => {
      $('#contacto').on('shown.bs.modal', () => {
        $('#focusInput').trigger('focus');
      });
    });
  }

  logOut(){
    this.online =false
    this.ojo2 = true
  }

  //Inicio
  pagina1(){
    this.mostrar1 = true
    this.mostrar2 = false
    this.mostrar3 = false

    this.clase1 = 'btn-warning'
    this.clase2 = 'btn-outline-warning'
    this.clase3 = 'btn-outline-warning'
  }

  pagina2(){
    this.mostrar1 = false
    this.mostrar2 = true
    this.mostrar3 = false

    this.clase1 = 'btn-outline-warning'
    this.clase2 = 'btn-warning'
    this.clase3 = 'btn-outline-warning'
  }

  pagina3(){
    this.mostrar1 = false
    this.mostrar2 = false
    this.mostrar3 = true

    this.clase1 = 'btn-outline-warning'
    this.clase2 = 'btn-outline-warning'
    this.clase3 = 'btn-warning'
  }

  cerrarTec(){
    $('#modalTecnologias').modal('hide')
    setTimeout(() => {
      this.pagina1()
    }, 500)    
  }

  cerrarSobreMi(){
    $('#sobreMi').modal('hide')
  }
}
