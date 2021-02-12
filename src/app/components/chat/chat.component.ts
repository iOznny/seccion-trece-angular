import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})

export class ChatComponent implements OnInit {

  menssage: string = '';
  element: any;

  constructor(public chatSv: ChatService) { 
    this.chatSv.loadMessage().subscribe( () => {
      // Cada que se reciba un mensaje se posiciona hasta abajo el elemento.
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 20);
    });
  }

  ngOnInit() {
    this.element = document.getElementById('app-messages');
  }

  // Enviar mensaje.
  sendMessage() {
    if(this.menssage.length === 0) {
      return;
    }

    // Enviamos el mensaje.
    this.chatSv.addMessage(this.menssage).then( () => {
      // Clear al input.
      this.menssage = '';
    }).catch( (err) => {
      console.log('error' + err);
    });
  }
}
