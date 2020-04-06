import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { client } from 'src/app/models/client';
@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.css']
})
export class EditClientsComponent implements OnInit {
  id: string;
  client: client = {
    firsName: '',
    lastName: '',
    email: '',
    phone: null,
    balance: 0
  };
  showBalance = false;
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;  
  });
}
onSubmit(){
  this.client.id = this.id;
  this.clientService.updateClient(this.client);
  this.flashMessage.show('Client updated', {cssClass: 'alert-success', timeout: 4000});
  this.router.navigate(['/client/', this.id]);
}
}
