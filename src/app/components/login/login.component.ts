import { Component } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})

export class LoginComponent {

  constructor(public chatSv: ChatService) { 
  }

  // Metodo de ingresa.
  login(prov: string) {
    this.chatSv.login(prov);
  }

}
