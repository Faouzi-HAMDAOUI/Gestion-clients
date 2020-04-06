import { Injectable } from '@angular/core';
import 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from 'angularfire2/firestore';
import { client } from '../models/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  // mes variables
  clientsCollection: AngularFirestoreCollection<client>;
  clientsDoc: AngularFirestoreDocument<client>;
  clients: Observable<client[]>;
  client: client;
  authClient: any;
  user: string;
  // mon constrocteur 
  constructor( private afs: AngularFirestore ) { 
    this.clientsCollection = this.afs.collection('clients');  
  }
  // fonction qui récupére la liste de mes cliens 
  getClients(user: string): Observable<client[]> {
    return this.afs.collection('clients', ref => ref.where('user', '==', user))
                  .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  // ajouter un clein 
  newClient(client: client){
    this.clientsCollection.add( client );
  }
  // recupere un seul client
  getClient(id: string): Observable<client>{
     return this.clientsCollection.doc(id).valueChanges();
  }
  // update client 
  updateClient(client: client){
    this.clientsDoc = this.clientsCollection.doc(client.id);
    this.clientsDoc.update(client);
  }
  // supprimer un client
  deletClient(id: string){
    this.clientsDoc = this.clientsCollection.doc(id);
    this.clientsDoc.delete();
  }
}
