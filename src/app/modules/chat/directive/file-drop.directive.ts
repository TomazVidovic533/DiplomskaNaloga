import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[fileDrop]'
})
export class FileDropDirective {

  @Output() fileHasBeenDropped =  new EventEmitter<FileList>();
  @Output() isFileOver =  new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event'])
  onDrop($event:any) {
    $event.preventDefault();
    this.fileHasBeenDropped.emit($event.dataTransfer.files);
    this.isFileOver.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event:any) {
    $event.preventDefault();
    this.isFileOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event:any) {
    $event.preventDefault();
    this.isFileOver.emit(false);
  }



}
