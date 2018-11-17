import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { FotoComponent } from './components/foto/foto.component';
import { CargaComponent } from './components/carga/carga.component';

import { APP_ROUTING } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    FotoComponent,
    CargaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
