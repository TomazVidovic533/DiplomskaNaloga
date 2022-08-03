import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-custom-file-upload',
  templateUrl: './custom-file-upload.component.html',
  styleUrls: ['./custom-file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomFileUploadComponent,
      multi: true
    }
  ]
})
export class CustomFileUploadComponent implements  ControlValueAccessor {

  selectedImage!: string | undefined;
  onChange!: Function;
  private file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    this.selectedImage= this.file?.name;
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }

  writeValue( value: null ) {
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( onChange: Function ) {
    this.onChange = onChange;
  }

  registerOnTouched( fn: Function ) {
  }

}
