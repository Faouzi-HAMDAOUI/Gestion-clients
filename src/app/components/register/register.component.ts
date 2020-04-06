import { Component, OnInit } from '@angular/core';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
email: string;
password: string;
  constructor(private authClient: AuthClientService, private route: Router, private flashMessage: FlashMessagesService) { }
  ngOnInit(): void {
  }
  onRegister(){
    this.authClient.registerUser(this.email, this.password)
         .then(registerUser => {
           if (registerUser) {
             this.flashMessage.show('congratuation you are loged', {
               cssClass: 'alert-success', timout: 5000
             });
             this.route.navigate(['/']);
           }
         })
         .catch(error => {
           this.flashMessage.show(error.message, {cssClass: 'alert-success', timout: 5000 });
         });
  }

}
