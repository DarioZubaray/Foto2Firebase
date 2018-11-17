import { Component } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent {

  archivos: FileItem[] = [];

  constructor( public _cis: CargaImagenesService ) { }

  cargarImagenes() {
    this._cis.cargarImagenesFirebase( this.archivos );
  }
}
