import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:7001/imatcherapi/';
   //union type where a thing can have a an initial value or can be null
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any)
  {
    return this.http.post<User>(this.baseUrl + 'account/signin', model).pipe(
      map((response: User)=>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  //set the current user
  setCurrentUser(user: User){
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
          //store the user in the local storage
          localStorage.setItem('user', JSON.stringify(user));

          //set the current user
          this.currentUserSource.next(user);
        }

        return user; //return the user
      })
    )


  }
}
