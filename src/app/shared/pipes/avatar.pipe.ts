import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'avatar' })
export class AvatarPipe implements PipeTransform {

  transform(value: string) {
    if (value) {
      return value[0].toUpperCase();
    }

    return value;
  }
}