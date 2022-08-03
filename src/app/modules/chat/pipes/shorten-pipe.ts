import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'ShortenText'
})
export class ShortenTextPipe implements PipeTransform {
  transform(message:string | undefined , length:number): string {
    if(message){
      return message.length > length ? `${message.substring(0, length)} ...` : message;
    }
    return '';
  }
}
