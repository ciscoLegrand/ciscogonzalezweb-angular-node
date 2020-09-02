import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { pluck } from 'rxjs/operators'

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null
  pass = ''
  autentificado = false//guard

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.getId()
  }

  login(nombre: string, password: string){

    const data = { nombre, password}

    return new Promise( resolve => {
      this.http.post(`${URL}/usuario/entrar`, data)
        .subscribe((res: any) => {
          if(res.ok) {
            this.guardarToken(res.token)
            resolve(true)
          }else{
            resolve(false)
            this.logOut()
          }
        })
    })
  }

  guardarToken(token: string){
    this.token = token
  }

  logOut(){
    this.token = null
    this.autentificado = false
    this.router.navigateByUrl('inicio')
  }

  getId(){
    return this.http.get(`${URL}/sobremi`)
      .pipe(
        pluck('sobreMi','0','_id')//asi accedemos a sobremi, a la posicion 0 del array, y al id
      )
      .subscribe((res: any) => {
        this.pass = res
      })
  }
}
