import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../Components/members/member-edit/member-edit.component';
import { inject } from '@angular/core';

export const UnsavedChangesPromptGuard: CanDeactivateFn<MemberEditComponent> = (component: MemberEditComponent) => {


  if (component.profileEditForm?.dirty) {
    return confirm('Are you sure you want to continue? Any unsaved changes will be lost!');
  }

  return true;
}


