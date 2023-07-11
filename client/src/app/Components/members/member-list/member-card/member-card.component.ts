import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],

})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined; // member is an input property and check if there is a member before using its properties else set undefined


  constructor() { }

  ngOnInit(): void {
  }

}
