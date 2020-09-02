import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiaCompletaRoutingModule } from './noticia-completa-routing.module';
import { NoticiaCompletaComponent } from './noticia-completa.component';
import { PipesModule } from 'src/app/pipes/pipes/pipes.module';


@NgModule({
  declarations: [NoticiaCompletaComponent],
  imports: [
    CommonModule,
    NoticiaCompletaRoutingModule,
    PipesModule
  ]
})
export class NoticiaCompletaModule { }
