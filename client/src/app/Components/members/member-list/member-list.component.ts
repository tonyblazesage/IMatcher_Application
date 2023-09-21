import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserFilterParams } from 'src/app/_models/userFilterParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  //members$: Observable<Member[]> | undefined; //members array
  members: Member[] | undefined; //members array
  pagination: Pagination | undefined; //pagination object
  userFilterParams: UserFilterParams | undefined;//user filter params object
  user: User | undefined; //user object
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }]
  

  constructor(private memberService: MembersService, private accounService: AccountService) {
    this.accounService.currentUser$.pipe().subscribe({
      next: user => {
        if(user){
          this.userFilterParams = new UserFilterParams(user); //create a new user filter params object
          this.user = user; //get the current user
        }
      }
    })
   }

  ngOnInit(): void {
   //this.members$ = this.memberService.getMembers(); //get the members array
   this.loadMembers();
  }


  loadMembers()
  {
    if(!this.userFilterParams) return; //if the user filter params object is null, return
    this.memberService.getMembers(this.userFilterParams).subscribe(response => {
      if(response.result && response.pagination)
      {
        this.members = response.result; //get the members array from the response
        this.pagination = response.pagination; //get the pagination object from the response
      }
    })
  }

  pageChanged(event: any){
    if(this.userFilterParams && this.userFilterParams?.pageNumber !== event.page)
    {
      this.userFilterParams.pageNumber = event.page; //get the current page number
      this.loadMembers(); //load the members array
    }

  }

  reset(){
    if(this.user){
      this.userFilterParams = new UserFilterParams(this.user); //create a new user filter params object
      this.loadMembers(); //load the members array
    }
  }
}
