import { Component } from '@angular/core';

declare let $:any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ciscogonzalezdev';

  constructor(){
    setTimeout(() => {
      $('#cookieModal').modal()
    },100)
  }

  salir(){
    setTimeout(() => {
      //si entramos desde otra url (p.e google) y no aceptamos cookies nos redireccionara a la pagina en la que estabamos
      window.history.back()
    },400)
  }
}
