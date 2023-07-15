import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl; //get the base url from the environment file


   //union type where a thing can have a an initial value or can be null
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  login(model: any)
  {
    return this.http.post<User>(this.baseUrl + 'account/signin', model).pipe(
      map((response: User)=>{
        const user = response;
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  //set the current user
  setCurrentUser(user: User){
    //store the user in the local storage
    localStorage.setItem('user', JSON.stringify(user));

    //set the current user
    this.currentUserSource.next(user);
  }

  logout()
  {
    //remove the user from the local storage
    localStorage.removeItem('user');

    //set the current user to null
    this.currentUserSource.next(null);
  }

  Signup(model: any)
  {
    return this.http.post<User>(this.baseUrl + 'account/signup', model).pipe(
      map(user => {
        if(user)
        {

          this.setCurrentUser(user);

          //navigate to the matches page
          this.router.navigateByUrl('/matches');

          this.toastr.success('Signup successful');
        }

        return user; //return the user
      })
    )


  }
}
