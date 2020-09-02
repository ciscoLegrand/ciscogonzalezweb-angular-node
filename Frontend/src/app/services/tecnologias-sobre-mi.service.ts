import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class TecnologiasSobreMiService {

  tecSel: any

  mostrarTec = false

  mostrarSobreMi = false

  constructor(
    private http: HttpClient,
    public usuarioService: UsuarioService
  ) { }

  getTecnologia() {
    return this.http.get(`${URL}/tecnologia`)
  }

  getSobreMi() {
    return this.http.get(`${URL}/sobremi`)
  }

  actualizarTecnologia(tec: string, id: string) {
    const headers = {
      miToken: this.usuarioService.token
    }

    return this.http.post(`${URL}/tecnologia/update/${id}`, tec, { headers }).subscribe()
  }

  actualizarSobreMi(txtSobreMi: string, id: string) {
    const headers = {
      miToken: this.usuarioService.token
    }

    return this.http.post(`${URL}/sobremi/update/${id}`, txtSobreMi, { headers }).subscribe()
  }
}
