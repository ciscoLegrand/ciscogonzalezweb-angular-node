import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  suma: Number

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getMensajes(){
    return this.http.get(`${URL}/contacto`)
  }

  borrarMensaje(id: string){
    return this.http.delete(`${URL}/contacto/${id}`)
  }

  sumaMensajes(){
    this.getMensajes().subscribe((res: any) => {
      this.suma = res.mensajes.length
    })
  }

  crearMensaje(email: string, mensaje: string) {
    const data = {email, mensaje}
    return this.http.post(`${URL}/contacto`, data)
      .subscribe(() => {
        this.router.navigateByUrl('/inicio', {skipLocationChange: true})
          .then(() => this.router.navigate(['mensajes']))
      })
  }
}
