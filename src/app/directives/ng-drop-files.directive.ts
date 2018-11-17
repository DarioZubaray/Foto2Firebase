import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ) {
    this.mouseSobre.emit( true );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.mouseSobre.emit( false );
  }

  /* Validaciones */
  private _archivoPuedeSerCargado( archivo: File ): boolean {
    let noFueDropeado = !this._archivoYaFueDroppeado( archivo.name );
    let esImagen = this._esImagen( archivo.type );
    return noFueDropeado && esImagen;
  }

  private _prevenirDetener( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaFueDroppeado( nombreArchivo: string ): boolean {
    for(const archivo of this.archivos ){
      if(archivo.nombreArchivo == nombreArchivo ) {
        console.log("El archivo " + nombreArchivo + " ya està agregado");
        return true;
      }
    }
    return false;
  }

  private _esImagen( tipoArchivo: string ): boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }
}
