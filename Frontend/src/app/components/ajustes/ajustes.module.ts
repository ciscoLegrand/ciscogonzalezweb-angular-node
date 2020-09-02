import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjustesRoutingModule } from './ajustes-routing.module';
import { AjustesComponent } from './ajustes.component';
import { ModalsComponent } from './modals.component';
import { FormsModule } from '@angular/forms';
import { CrearNoticiaComponent } from './crear-noticia/crear-noticia.component'

@NgModule({
  declarations: [AjustesComponent, ModalsComponent, CrearNoticiaComponent],
  imports: [
    CommonModule,
    AjustesRoutingModule,
    FormsModule
  ]
})
export class AjustesModule { }
