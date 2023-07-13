import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../Components/members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesPromptGuard implements CanDeactivate<MemberEditComponent> {
  canDeactivate(
    component: MemberEditComponent): boolean {
    if(component.profileEditForm?.dirty) {
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost!');
    }

    return true;
  }

}
