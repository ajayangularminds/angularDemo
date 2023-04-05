import { Pipe, PipeTransform } from '@angular/core';
import { RoomList } from './rooms';

@Pipe({
  name: 'myFilter'
})
export class FilterPipe implements PipeTransform {

  transform(rooms: RoomList[] , price: number): any {
    return rooms.filter((room)=>room.price>=price);
  }

}
