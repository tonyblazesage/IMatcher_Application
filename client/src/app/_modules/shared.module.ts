import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//angular material

//material imports
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


//font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


//ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from "ngx-timeago";

//ngb-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ToastrModule.forRoot(
      {
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      easing: 'ease-in',
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
      disableTimeOut: false,
      }
    ),
    TabsModule.forRoot(),

    //material modules
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatDividerModule,
    NgbModule,

    //ngx
    NgxSpinnerModule.forRoot({
      type: 'square-jelly-box',
    }),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FileUploadModule,
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    TimeagoModule.forRoot(),
  ],
  exports: [
    FontAwesomeModule,
    BsDropdownModule,
    CollapseModule,
    ToastrModule,
    NgbModule,
    MatCardModule,
    MatSelectModule,
    FontAwesomeModule,
    MatDividerModule,
    TabsModule,
    BsDatepickerModule,
    NgxSpinnerModule,
    FileUploadModule,
    PaginationModule,
    TooltipModule,
    ButtonsModule,
    TimeagoModule
  ],
})
export class SharedModule { }
