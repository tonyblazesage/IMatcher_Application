import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any;
  registerState = false;

  constructor(private http: HttpClient, public accountservice: AccountService){}


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


  registerFormToggler()
  {
    this.registerState = !this.registerState;
  }


}
