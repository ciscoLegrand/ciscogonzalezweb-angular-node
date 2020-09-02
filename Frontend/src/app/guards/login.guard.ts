import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( public usuarioService: UsuarioService ){}
  canActivate(): boolean {
    if( this.usuarioService.autentificado === true ){
      return true;
    } else {
      return false
    }
  }
  
}
