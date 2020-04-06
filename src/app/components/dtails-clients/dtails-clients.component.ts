import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { client } from 'src/app/models/client';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
@Component({
  selector: 'app-dtails-clients',
  templateUrl: './dtails-clients.component.html',
  styleUrls: ['./dtails-clients.component.css']
})
export class DtailsClientsComponent implements OnInit {
id: string;
client: client;
showBalance = false;
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
     // console.log(client);
    });
  }
// update balance
  onSubmit(){
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.flashMessage.show('balance updated', {cssClass: 'alert-warning', timeout: 4000});
    this.showBalance = false;
  }
  // supprimer le client
  deleteClient(id: string){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.clientService.deletClient(id);
        this.flashMessage.show('client deleted', {cssClass: 'alert-danger', timeout: 4000});
        this.router.navigate(['/']);
        Swal.fire({
          title: 'Deleted',
           text: 'this client is deleted',
           icon: 'success',
           timer: 3000
        });
      } 
    });
  }

}
