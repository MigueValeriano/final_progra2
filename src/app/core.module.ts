import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


@NgModule({
  imports: [
    HttpClientModule,
    RouterModule,
    AngularFireAuthModule // Importamos HttpClientModule aquí para toda la aplicación
  ],
  providers: [
    // Aquí puedes incluir todos los servicios que desees que sean globales
  ],
  exports: [ RouterModule ] // Asegúrate de incluir esto también ]
})
export class CoreModule {
  constructor() {
    console.log('CoreModule cargado.');
  }
}
