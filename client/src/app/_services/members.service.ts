import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService  {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  // get all the users
  getMembers()
  {
    if(this.members.length > 0) return of (this.members); //if members array is not empty, return it
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map( (members) => {
        this.members = members;
        return members;
      })
    )
  }

  // get the user
  getMember(username: string)
  {
    const member = this.members.find(x => x.userName === username); //find the member in the members array

    if(member) return of(member); //if member is found, return it

    return this.http.get<Member>(this.baseUrl + 'users/' + username); //if member is not found, get it from the server
  }

  // update the user
  updateUser(member: Member)
  {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member); //get the index of the member in the members array
        this.members[index] = {...this.members[index], ...member}; //update the member in the members array (... is a spread operator)
      })
    )
  }
}
