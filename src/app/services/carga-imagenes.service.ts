import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  CARPETA_IMAGENES: string = 'img';

  constructor( private db: AngularFirestore ) {
    console.log("Iniciando angularFirestore");
  }

  public guardarImagen( imagen: { nombre: string, url: string} ) {
    this.db.collection(`/${ this.CARPETA_IMAGENES}`)
           .add( imagen );
  }

  public cargarImagenesFirebase( imagenes: FileItem[] ) {
    console.log(imagenes);
    const storageRef = firebase.storage().ref();

    for( const item of imagenes ) {
      item.estaSubiendo = true;
      if(item.progreso >= 100) {
        continue;
      }
      const uploadTask: firebase.storage.UploadTask =
        storageRef.child(`/${ this.CARPETA_IMAGENES}/${ item.nombreArchivo }`).put( item.archivo );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
            ( snapshot: firebase.storage.UploadTaskSnapshot ) => {
              item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            ( error ) => {
              console.error('Error al subir', error);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then(u => {
                item.url =  u
                item.estaSubiendo = false;
                item.progreso = 100;

                const imagen = { nombre: item.nombreArchivo, url: item.url };
                console.log(imagen);
                this.db.collection(`/${ this.CARPETA_IMAGENES}`)
                       .add( imagen );
              });
            });
    }

  }
}
