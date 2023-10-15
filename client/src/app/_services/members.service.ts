import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { UserFilterParams } from '../_models/userFilterParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map(); //cache the members using map allows us to get and set values using a key
  user: User | undefined;
  userFilterParams: UserFilterParams | undefined;


  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.userFilterParams = new UserFilterParams(user); //create a new user filter params object
          this.user = user; //get the current user
        }
      }
    })
  }

  //get filter parameters
  getUserFilterParams(){
    return this.userFilterParams;
  }

  //set user filter user parameters
  setUserFilterParams(filterParams: UserFilterParams){
    this.userFilterParams = filterParams;
  }

  resetUserFilterParams(){
    if(this.user){
      this.userFilterParams = new UserFilterParams(this.user);
      return this.userFilterParams;
    }

    return;
  }


  // get the members
  getMembers(userFilterParams: UserFilterParams) {
    const response = this.memberCache.get(Object.values(userFilterParams).join('-')); //get the members from the cache memory

    if (response) return of(response); //if the members are in the cache memory, return them

    let params = this.getPaginationHeaders(userFilterParams.pageNumber, userFilterParams.pageSize);


    params = params.append('minAge', userFilterParams.minAge);
    params = params.append('maxAge', userFilterParams.maxAge);
    params = params.append('gender', userFilterParams.gender);
    params = params.append('orderBy', userFilterParams.orderBy);


    //return members if they are not in the cache memory
    return this.getPaginationResults<Member[]>(this.baseUrl + 'users', params).pipe(
      map(response => {
        this.memberCache.set(Object.values(userFilterParams).join('-'), response); //set the members in the cache memory
        return response;
      })
    )
  }




  // get the user
  getMember(username: string) {
    const member = [...this.memberCache.values()] //get all the members from the cache memory
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === username);

      if(member) return of(member)

    return this.http.get<Member>(this.baseUrl + 'users/' + username); //if member is not found, get it from the server
  }

  // update the user
  updateUser(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member); //get the index of the member in the members array
        this.members[index] = { ...this.members[index], ...member }; //update the member in the members array (... is a spread operator)
      })
    )
  }

  // set the main photo
  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {}); //empty object is required
  }


  //delete the photo
  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }



  //PRIVATE METHODS


  //get paginated results
  private getPaginationResults<T>(url: string, params: HttpParams) {
    const pageinatedResult: PaginatedResult<T> = new PaginatedResult<T>;
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          pageinatedResult.result = response.body;
        }

        const pagination = response.headers.get('Pagination'); //get the pagination header from the response

        if (pagination) {
          pageinatedResult.pagination = JSON.parse(pagination); //parse the pagination header into a JSON object
        }

        return pageinatedResult;
      })

    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();


    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    return params;
  }
}
