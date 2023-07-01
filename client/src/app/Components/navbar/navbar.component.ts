import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private http: HttpClient, public accountservice: AccountService, private router: Router, private toastr: ToastrService){}


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
      next: () => {
        this.router.navigateByUrl('/matches');
        this.toastr.success('Logged in successfully');
      },
      error: error => this.toastr.error(error.error)
    })
  }

  logout(){
    this.accountservice.logout();
    this.router.navigateByUrl('/')
  }


}
