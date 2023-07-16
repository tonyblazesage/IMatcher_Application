import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup  = new FormGroup({});
  model: any = {}

  constructor(private accountservice: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.InitForm();
  }

  InitForm(){
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')]),
    });

    this.signupForm.controls['password'].valueChanges.subscribe({
      next: () => { this.signupForm.controls['confirmPassword'].updateValueAndValidity()} //update the value of the confirm password field
    })
  }

  matchValues(matchTo: string): ValidatorFn{
    return (control: AbstractControl) =>{
      return control?.value === control?.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }



  SignUp()
  {
    console.log(this.signupForm?.value);
    // this.accountservice.Signup(this.model).subscribe({
    //   next: response =>{

    //     this.Cancel();
    //   },
    // error: error => {
    //   this.toastr.error(error.error);
    //   console.log(error)
    // }
    // })
  }

  Cancel()
  {
    console.log('Cancelled');
  }

}
