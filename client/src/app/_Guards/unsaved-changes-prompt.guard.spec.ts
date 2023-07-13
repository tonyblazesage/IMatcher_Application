import { TestBed } from '@angular/core/testing';

import { UnsavedChangesPromptGuard } from './unsaved-changes-prompt.guard';

describe('UnsavedChangesPromptGuard', () => {
  let guard: UnsavedChangesPromptGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnsavedChangesPromptGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
