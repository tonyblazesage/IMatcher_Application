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
  maxDate: Date = new Date();
  validationErrors: string[] | undefined;

  constructor(private accountservice: AccountService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.InitForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); //set the max date to 18 years ago
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
    const dob = this.getDateOnly(this.signupForm.controls['dateOfBirth'].value); //get the date only from the date of birth
    const signupformvalues = {...this.signupForm.value, dateOfBirth: dob}; //spread the form values and replace the date of birth with the date only
    this.accountservice.Signup(signupformvalues).subscribe({
      next: response =>{

        this.Cancel();
      },
    error: error => {
      this.validationErrors = error;
    }
    })
  }

  Cancel()
  {
    this.signupForm?.reset();

  }

  private getDateOnly(dob: string | undefined){
    if (!dob) return; //if no date is passed, return today's date
    let thedob = new Date(dob); //convert to date
    return new Date(thedob.setMinutes(thedob.getMinutes() - thedob.getTimezoneOffset())).toISOString().slice(0, 10)//convert to ISO string and return only the date part
  }

}
