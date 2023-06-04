import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  users: any;
  model: any = {};
  currentUser$ : Observable<User | null> = of(null);
  isCollapsed = false;

  constructor(private http: HttpClient, public accountservice: AccountService, private offcanvasService: NgbOffcanvas){}


  ngOnInit(): void {
    this.getUsers();
  }

  getUsers()
  {
    this.http.get('https://localhost:7001/imatcherapi/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }

  login()
  {
    this.accountservice.login(this.model).subscribe({
      next: response => {
        this.model = response;
        console.log(response);
      },
      error: error => console.log(error)
    })
  }

  logout(){

    this.accountservice.logout();
  }

  openTop(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'top' });
	}



}
