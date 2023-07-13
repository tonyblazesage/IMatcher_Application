import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//angular material
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';

//material imports
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';


//font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


//ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';


//ngb-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';



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
    NgxGalleryModule
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
    NgxGalleryModule
  ],
})
export class SharedModule { }
