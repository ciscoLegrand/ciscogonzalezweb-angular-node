import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NoticiaService } from '../services/noticia.service';

@Injectable({
  providedIn: 'root'
})
export class NoticiaCompletaGuard implements CanActivate {
  
  constructor(private noticasService: NoticiaService){}
  
  canActivate(): boolean {
    // if (this.noticasService.noticiaCompleta === true) {
    //   return true
    // }else{
    //   return false
    // }
    return this.noticasService.noticiaCompleta === true ? true :false
  }
}
