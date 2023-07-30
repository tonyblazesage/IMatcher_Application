import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs';
import { Photo } from 'src/app/_models/photo';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  currentUser: User | null = null;


  constructor(private accountService: AccountService, private memberService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (currentUser) => {
        if (currentUser) this.currentUser = currentUser
      }
    })
  }

  ngOnInit(): void {
    this.initializeUploader();

  }

  fileOverBase(event: any) {
    this.hasBaseDropZoneOver = event;
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if (this.currentUser && this.member){
          this.currentUser.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.currentUser); // set the current user photo url

          this.member.photoUrl = photo.url; // set the member photo url
          this.member.photos.forEach(p => {
            if(p.isMain) p.isMain = false; // set photo to false
            if(p.id === photo.id) p.isMain = true; // set the main photo to true
          })
        }
      }
    })
  }

  // delete the photo
  deletePhoto(photoId: number){
    this.memberService.deletePhoto(photoId).subscribe({
      next: () => {
        if(this.member){
          this.member.photos = this.member.photos.filter(x => x.id !== photoId); // filter out the photo
      }
      }
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.currentUser?.token,
      isHTML5: true, // use HTML5
      allowedFileType: ['image'], // only image
      removeAfterUpload: true, // remove after upload
      autoUpload: false, // manual upload
      maxFileSize: 10 * 1024 * 1024 // 10MB
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false; // no credentials
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response)
      {
        const photo = JSON.parse(response); // parse response
        this.member?.photos.push(photo); // push photo to member photos

        if(photo.isMain && this.currentUser && this.member){
          this.currentUser.photoUrl = photo.url; // set the current user photo url
          this.member.photoUrl = photo.url; // set the member photo url
          this.accountService.setCurrentUser(this.currentUser); // set the current user photo url
        }
      }
    }
  }




}
