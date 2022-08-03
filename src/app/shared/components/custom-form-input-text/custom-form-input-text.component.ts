import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-custom-form-input-text',
  templateUrl: './custom-form-input-text.component.html',
  styleUrls: ['./custom-form-input-text.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomFormInputTextComponent,
      multi: true,
    },
  ],
})
export class CustomFormInputTextComponent implements OnInit, ControlValueAccessor {

  @Input() type!: string;
  @Input() placeholderValue!: string;
  inputValue!: string;
  onChange!: (value: string) => void;
  onTouched!: () => void;
  @Input() optionItems!: string[];

  constructor() {

  }

  ngOnInit(): void {
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: any): void {
    this.inputValue = value ?? '';
  }

}
