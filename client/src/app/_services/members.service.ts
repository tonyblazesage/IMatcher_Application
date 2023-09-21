import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { UserFilterParams } from '../_models/userFilterParams';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];


  constructor(private http: HttpClient) { }

  // get the members
  getMembers(userFilterParams: UserFilterParams) {
    let params = this.getPaginationHeaders(userFilterParams.pageNumber, userFilterParams.pageSize);


    params = params.append('minAge', userFilterParams.minAge);
    params = params.append('maxAge', userFilterParams.maxAge);
    params = params.append('gender', userFilterParams.gender);
    params = params.append('orderBy', userFilterParams.orderBy);

    return this.getPaginationResults<Member[]>(this.baseUrl + 'users', params)
  }


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

  // get the user
  getMember(username: string) {
    const member = this.members.find(x => x.userName === username); //find the member in the members array

    if (member) return of(member); //if member is found, return it

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
}
