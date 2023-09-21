import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery, GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { SharedModule } from 'src/app/_modules/shared.module';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  standalone: true,
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.css'],
  imports: [GalleryModule, TabsModule, CommonModule, SharedModule]
})
export class MemberInfoComponent implements OnInit {
  member: Member | undefined;
  images: GalleryItem[] = [];

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();

  }

  getImages() {
    if(!this.member) return; //if member is undefined, return empty array

    for(const photo of this.member?.photos) {
     this.images.push(new ImageItem({ src: photo.url, thumb: photo.url}));
    }


  }

  loadMember() {
    var username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        this.getImages()
      }
    })
  }

}
