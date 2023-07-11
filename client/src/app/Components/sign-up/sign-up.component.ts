import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  model: any = {}

  constructor(private accountservice: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  SignUp()
  {
    this.accountservice.Signup(this.model).subscribe({
      next: response =>{

        this.Cancel();
      },
    error: error => {
      this.toastr.error(error.error);
      console.log(error)
    }
    })
  }

  Cancel()
  {
    console.log('Cancelled');
  }

}
