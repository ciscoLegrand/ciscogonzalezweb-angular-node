import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenYoPipe } from '../imagen-yo.pipe';
import { ImagenNoticiaPipe } from '../imagen-noticia.pipe';



@NgModule({
  declarations: [ImagenYoPipe, ImagenNoticiaPipe],
  imports: [
    CommonModule
  ],
  exports: [ImagenYoPipe, ImagenNoticiaPipe]
})
export class PipesModule { }
