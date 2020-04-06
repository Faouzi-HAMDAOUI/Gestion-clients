import { Component, OnInit } from '@angular/core';
import { client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from 'src/app/services/auth-client.service';
@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.css']
})
export class AddClientsComponent implements OnInit {
  client: client = {
    firsName: '',
    lastName: '',
    email: '',
    phone: null,
    balance: 0,
    user: ''
  };
  constructor(
      private clientService: ClientService,
      private route: Router,
      private flashMessages: FlashMessagesService,
      private authClient: AuthClientService
      ) { }
  ngOnInit(): void {
    this.authClient.getAuth().subscribe(auth => {
     this.client.user = auth.uid;
    });
  }
  // Ajouter un client
  onSubmit(){
   this.clientService.newClient(this.client);
   this.flashMessages.show('Client added successfully', {cssClass: 'alert-primary', timeout: 5000});
   return this.route.navigate(['/']);
  }

}
