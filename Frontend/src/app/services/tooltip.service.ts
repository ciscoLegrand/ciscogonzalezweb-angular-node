import { Injectable } from '@angular/core';

declare let $: any

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  settings = true
  settings2 = true
  settings3 = true

  constructor() { }

  abrirTooltip(){
    $(() => {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

  abrirTooltipHover(){
    $(() => {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      })
    })
  }

  cerrarTooltip() {
    $('[data-toggle="tooltip"]').tooltip('hide')
  }
}
