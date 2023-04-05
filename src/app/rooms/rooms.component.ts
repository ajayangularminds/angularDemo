import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of, skip } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {
  hotelName = 'Hilton Hotel';
  numberOfRooms = 10;

  hideRooms = true;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  selectedRoom !: RoomList ;

  roomList: RoomList[] = [];

  stream = new Observable<string>(observer=>{
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    //observer.error('error')
  });

  error:string='';

  totalBytes=0;

  subscription !:Subscription;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err)=>{console.log(err);
      this.error$.next(err.message);
    return of([]);
  })
  );

  priceFilter = new FormControl(0);

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms)=>rooms.length)
  );
   
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent !: QueryList<HeaderComponent>;

  constructor(@SkipSelf() private roomsService:RoomsService,
  private config:ConfigService) {}

  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe((event)=>{
      switch (event.type) {
        case HttpEventType.Sent:{
          console.log("Request Has Been Made");
          break;
        }
        case HttpEventType.ResponseHeader:{
          console.log("Request success!");
          break;
        }
        case HttpEventType.DownloadProgress:{
            this.totalBytes += event.loaded;
            break;
        }
        case HttpEventType.Response:{
          console.log(event.body);
        }
      }
    });
    this.stream.subscribe({
      next : (value) => {console.log(value)},
      complete : () => {console.log('Complete')},
      error : (err) => {console.log(err)}
    })
    this.stream.subscribe(data=>{console.log(data)})
 // this.roomsService.getRooms$.subscribe(rooms => {this.roomList=rooms});
    //console.log("From Header Component",this.headerComponent);
  }

  title = 'Room List'

  ngDoCheck(): void {
    console.log('On Changes is Called')
  }

  ngAfterViewInit(): void {
    //console.log("From ngAfterViewInit",this.headerComponent);
    
    this.headerChildrenComponent.last.title = "Last Title"
    
    this.headerComponent.title = "Rooms View";
  }

  ngAfterViewChecked(): void {
      
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List'
  }

  selectRoom(room:RoomList){
    console.log(room)
    this.selectedRoom = room;
  }

  addRoom(){
    const room:RoomList = {
      //roomNumber: "4",
        roomType: 'Delux Room',
        amenities: 'Air Conditioner, Free WIFI, Tv, BathRoom, Kitchen',
        price: 500,
        photos:
          'data:image/jpeg;base64,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',
        checkinTime: new Date('11-Nov-2021'),
        checkoutTime: new Date('12-Nov-2021'),
        rating:4.5
    };

    //this.roomList.push(room);
   // this.roomList = [...this.roomList,room];
   this.roomsService.addRoom(room).subscribe(data=>{this.roomList=data})
  }

  editRoom(){
    const room:RoomList = {
      roomNumber: "3",
        roomType: 'Delux Room',
        amenities: 'Air Conditioner, Free WIFI, Tv, BathRoom, Kitchen',
        price: 500,
        photos:
          'data:image/jpeg;base64,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',
        checkinTime: new Date('11-Nov-2021'),
        checkoutTime: new Date('12-Nov-2021'),
        rating:4.5
    };
    this.roomsService.editRoom(room).subscribe(data => {console.log(data);
    this.roomList=data})
  }
  deleteRoom(){
    this.roomsService.delete('3').subscribe(data => {console.log(data);
    this.roomList=data;
  })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
