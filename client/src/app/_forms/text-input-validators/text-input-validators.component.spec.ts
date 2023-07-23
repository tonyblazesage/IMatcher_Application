import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputValidatorsComponent } from './text-input-validators.component';

describe('TextInputValidatorsComponent', () => {
  let component: TextInputValidatorsComponent;
  let fixture: ComponentFixture<TextInputValidatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextInputValidatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextInputValidatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
