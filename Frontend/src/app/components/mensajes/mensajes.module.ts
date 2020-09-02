import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensajesRoutingModule } from './mensajes-routing.module';
import { MensajesComponent } from './mensajes.component';


@NgModule({
  declarations: [MensajesComponent],
  imports: [
    CommonModule,
    MensajesRoutingModule
  ]
})
export class MensajesModule { }
