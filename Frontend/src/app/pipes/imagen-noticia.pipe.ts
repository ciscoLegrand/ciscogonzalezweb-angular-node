import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url

@Pipe({
  name: 'imagenNoticia'
})
export class ImagenNoticiaPipe implements PipeTransform {

  transform(img: string): string {
    return `${URL}/noticias/imgNoticia/${img}`
  }

}
