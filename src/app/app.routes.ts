import { RouterModule, Routes } from '@angular/router';
import { FotoComponent } from './components/foto/foto.component';
import { CargaComponent } from './components/carga/carga.component';

const APP_ROUTES: Routes = [
  { path: 'foto', component: FotoComponent },
  { path: 'carga', component: CargaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'FotoComponent' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
