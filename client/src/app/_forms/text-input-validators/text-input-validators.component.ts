import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input-validators',
  templateUrl: './text-input-validators.component.html',
  styleUrls: ['./text-input-validators.component.css']
})
export class TextInputValidatorsComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this; // this is to make sure that the formControlName is working
  }

  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }




}
