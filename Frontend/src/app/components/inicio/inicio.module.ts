import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { ModalsComponent } from './modals.component';
import { PipesModule } from 'src/app/pipes/pipes/pipes.module';


@NgModule({
  declarations: [InicioComponent, ModalsComponent],
  imports: [
    CommonModule,
    InicioRoutingModule,
    PipesModule
  ]
})
export class InicioModule { }
