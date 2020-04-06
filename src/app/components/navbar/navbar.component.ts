import { Component, OnInit } from '@angular/core';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
isLoggedIn = false;
userLoggedIn: string;
  constructor(
    private authService: AuthClientService,
    private router: Router
    ) { }
  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
       this.isLoggedIn = true;
       this.userLoggedIn = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
  onLogAout(){
this.authService.logAout();
this.isLoggedIn = false;
   return this.router.navigate(['/login']);
  }
}
