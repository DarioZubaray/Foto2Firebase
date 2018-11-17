import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { name: string; url: string }

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styles: []
})
export class FotoComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor( private afs: AngularFirestore ) {
    this.itemsCollection = afs.collection<Item>('img');
    console.log(this.itemsCollection);
    this.items = this.itemsCollection.valueChanges();
    console.log(this.items);
  }

  ngOnInit() {
  }

}
