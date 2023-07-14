import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member: Member | undefined;
  user: User | null = null;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  // get the form
  @ViewChild('profileEditForm') profileEditForm: NgForm | undefined;

  // prevent the user from closing the tab
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if(this.profileEditForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
   }

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: 'slide',
        preview: false
      }
    ];
  }

  // get the images
  getImages() {
    if (!this.member) return []; //if member is undefined, return empty array
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }

    return imageUrls;
  }

  // load the member
  loadMember() {
    if(!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => {
        this.member = member;
        this.galleryImages = this.getImages();
      }
    });
  }

  // update the profile
  updateprofile()
  {
    this.memberService.updateUser(this.profileEditForm?.value).subscribe({
      next: () => {
        this.toastr.success('Profile updated successfully');
        this.profileEditForm?.reset(this.member);
      },
      error: error => {
        this.toastr.error(error);
      }
    })

  }

}
