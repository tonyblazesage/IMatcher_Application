import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @Output() cancelSignUp = () => {};
  signupForm: FormGroup  = new FormGroup({});
  model: any = {}
  maxDate: Date = new Date();

  @ViewChild('signupForm') signupFormDirective: FormGroup | undefined;
  constructor(private accountservice: AccountService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.InitForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  InitForm(){
    this.signupForm = this.fb.group({
      gender: ['male'],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      knownAs: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
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
    this.signupForm?.reset();

  }

}
