import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { client } from 'src/app/models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { AuthClientService } from 'src/app/services/auth-client.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: client[];
  total = 0;
  searchClients: client[];
  constructor(
     private clientService: ClientService,
     private flashMessage: FlashMessagesService,
     private router: Router,
     private authClient: AuthClientService
     ) { }
  ngOnInit(): void {
      this.authClient.getAuth().subscribe(auth => { 
        this.clientService.getClients(auth.uid).subscribe( clients => { // recuperer le listes des cliennt
        this.clients = clients;
        this.searchClients = this.clients = clients;
        // recuperer le ttotal des balance
        this.total = this.getTotal();
     });
    });
  }
  // Afficher la somme de mes Balance
  getTotal(){
      return this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString()) ;
    }, 0);
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
// recherche un cleint
  search(query: string){
        this.searchClients = (query) ? this.clients.filter(client =>
           client.firsName.toLowerCase().includes(query.toLowerCase()) ||
            client.lastName.toLowerCase().includes(query.toLowerCase()) ) :
             this.clients;
}
}
