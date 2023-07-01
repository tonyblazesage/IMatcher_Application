import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
        FontAwesomeModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ToastrModule.forRoot(
      {
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      easing: 'ease-in',
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
      disableTimeOut: false,
      }
    ),
    NgbModule
  ],
  exports: [
    FontAwesomeModule,
    BsDropdownModule,
    CollapseModule,
    ToastrModule,
    NgbModule
  ],
})
export class SharedModule { }
