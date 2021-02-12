import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from "rxjs/operators";

import { Message } from "../interface/message.interface";
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];
  public user: any = {
    name: ''
  };

  constructor(private afs: AngularFirestore, public auth: AngularFireAuth) { 
    this.auth.authState.subscribe( user_google => {
      if(!user_google) {
        return;
      }

      this.user.name = user_google.displayName;
      this.user.uid = user_google.uid;
    });
  }
  
  // Autenticación Google.
  login(prov: string) {
    if(prov === 'google') {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else {
      this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }
  }

  // Salir Google.
  logout() {
    this.user = {};
    this.auth.signOut();
  }

  loadMessage() {
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'desc').limit(5) );

    return this.itemsCollection.valueChanges().pipe(map( (messages: Message[]) => {
      //this.chats = messages;

      this.chats = [];

      // Ordenamos los mensajes
      for (let message of messages) {
        this.chats.unshift(message);
      }

      return this.chats;
    }));
  }

  // Agregar mensaje
  addMessage(text: string) {
    // Falta el UID del user.
    let message: Message = {
      name: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid
    };

    return this.itemsCollection.add(message);
  }

}
