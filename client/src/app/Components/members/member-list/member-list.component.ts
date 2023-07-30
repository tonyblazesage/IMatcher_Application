import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
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
  pageNumber = 1; //current page number
  pageSize = 12; //number of items per page

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
   //this.members$ = this.memberService.getMembers(); //get the members array
   this.loadMembers();
  }


  loadMembers()
  {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe(response => {
      if(response.result && response.pagination)
      {
        this.members = response.result; //get the members array from the response
        this.pagination = response.pagination; //get the pagination object from the response
      }
    })
  }

  pageChanged(event: any){
    if(this.pageNumber !== event.page)
    {
      this.pageNumber = event.page; //get the current page number
      this.loadMembers(); //load the members array
    }

  }
}
