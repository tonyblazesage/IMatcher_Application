
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

  constructor(public accountservice: AccountService){}


  ngOnInit(): void {
  }




  registerFormToggler()
  {
    this.registerState = !this.registerState;
  }


}
