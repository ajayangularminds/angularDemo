import { Component, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'hinv-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.css'],
})
export class RoomsAddComponent implements OnInit {
  room: RoomList = {
    roomType: '',
    amenities: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    photos: '',
    price: 0,
    rating: 0,
  };

  successMessage: string = '';

  constructor(private roomsService: RoomsService) {
  }

  ngOnInit(): void {}

  addRoom(roomsForm:NgForm) {
    this.roomsService.addRoom(this.room).subscribe((data) => {
      console.log(roomsForm);
      roomsForm.reset();
      this.successMessage = 'Room Added Successfully';
    });
  }
}
