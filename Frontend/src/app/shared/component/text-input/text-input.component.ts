import { NgClass, NgIf } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() label = '';
  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }
}
