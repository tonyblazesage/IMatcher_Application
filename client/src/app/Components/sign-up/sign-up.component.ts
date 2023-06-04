import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  model: any = {}
  constructor() { }

  ngOnInit(): void {
  }

  SignUp()
  {
    console.log(this.model);
  }

  Cancel()
  {
    console.log('Cancelled');
  }

}
