import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],

})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined; // member is an input property and check if there is a member before using its properties else set undefined


  constructor(private memberService: MembersService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addlike(member:Member){
    this.memberService.addLike(member.userName).subscribe({
      next: () => {
        this.toastr.success('You have liked ' + member.knownAs);
      }
    })
  }

}
