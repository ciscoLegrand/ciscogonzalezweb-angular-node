import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { NoticiaCompletaComponent } from './components/noticia-completa/noticia-completa.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ModalsComponent } from './shared/modals/modals.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common'
import localEs from '@angular/common/locales/es'

registerLocaleData(localEs)

@NgModule({
  declarations: [
    AppComponent,
    //NoticiaCompletaComponent,
    NavbarComponent,
    FooterComponent,
    ModalsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
