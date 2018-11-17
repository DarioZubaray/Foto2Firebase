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
    console.log("OnDragEnter");
    this._prevenirDetener( event );
    this.mouseSobre.emit( true );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    console.log("OnDragLeave");
    this.mouseSobre.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any ) {
    console.log("OnDrop");

    const transferencia = this._getTransferencia( event );
    if( !transferencia ) {
      console.log("no se pudo obtener la transferencia");
      return;
    }

    this._extraerArchivos( transferencia.files );
    this._prevenirDetener( event );
    this.mouseSobre.emit( false );
  }

  private _getTransferencia( event: any ) {
    console.log(event);
    if( event.dataTransfer ){
      console.log("event.dataTransfer");
      return event.dataTransfer;
    } else if (event.originalEvent.dataTransfer ){
      console.log("event.originalEvent.dataTransfer");
      return event.originalEvent.dataTransfer;
    } else {
      console.log("null");
      return null;
    }
  }

  private _extraerArchivos( archivosLista: FileList ) {
    // console.log(archivosLista);

    for( const propiedad in Object.getOwnPropertyNames( archivosLista ) ) {
      const archivoTemporal = archivosLista[propiedad];
      if( this._archivoPuedeSerCargado( archivoTemporal ) ){
        const nuevoArchivo = new FileItem( archivoTemporal );
        this.archivos.push(nuevoArchivo);
      }
    }
    console.log( this.archivos );
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
        console.log("El archivo " + nombreArchivo + " ya está agregado");
        return true;
      }
    }
    return false;
  }

  private _esImagen( tipoArchivo: string ): boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }
}
