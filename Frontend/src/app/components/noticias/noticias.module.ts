import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiasRoutingModule } from './noticias-routing.module';
import { NoticiasComponent } from './noticias.component';
import { PipesModule } from 'src/app/pipes/pipes/pipes.module';


@NgModule({
  declarations: [NoticiasComponent],
  imports: [
    CommonModule,
    NoticiasRoutingModule,
    PipesModule
  ]
})
export class NoticiasModule { }
