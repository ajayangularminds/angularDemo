import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidators} from './validators/custom-validators'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  checkout: any;
  booking: any;

  constructor(private configService: ConfigService,
    private fb: FormBuilder, 
    private bookingService:BookingService,
    private route:ActivatedRoute) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomId');
    this.bookingForm = this.fb.group({
      bookingId: [''],
      roomId: new FormControl({ value: roomId, disabled: true },{ validators: [Validators.required]}),
      guestEmail: ['', {updateOn : 'blur', validators: [Validators.required, Validators.email]}],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmouunt: [''],
      bookingDate: [''],
      mobileNumber: ['',{updateOn: 'blur'}],
      guestName: ['', [Validators.required, Validators.minLength(5), CustomValidators.validateName, CustomValidators.validateSpecialCharacter('*')]],

      address: this.fb.group({
        addressLine: ['', { validators: [Validators.required] }],
        addressLine2: [''],
        city: ['', { validators: [Validators.required] }],
        state: ['', { validators: [Validators.required] }],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([this.addGuestControl()]),
      tnc: new FormControl(false, {validators: [Validators.required]}),
    },{updateOn: 'blur', validators : [ CustomValidators.validateDate]})

    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((data)=>{
    //   this.bookingService.bookRoom(data).subscribe(data=>{})
    // })

    this.bookingForm.valueChanges.pipe(
      exhaustMap((data)=>this.bookingService.bookRoom(data))
      ).subscribe(data=>console.log(data))
    
  }

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  addBooking() {
    //this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data)=>{console.log(data)})
    console.log(this.bookingForm.getRawValue());
    this.bookingForm.reset({
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmouunt: '',
      bookingDate: '',
      mobileNumber: '',
      guestName1: '',

      address: {
        addressLine: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  getBookingData() {
    this.bookingForm.patchValue({
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('04/04/2023'),
      checkoutDate: new Date('05/04/2023'),
      bookingStatus: '',
      bookingAmouunt: '',
      bookingDate: '',
      mobileNumber: '',
      guestName1: '',

      address: {
        addressLine: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  addGuest() {
    this.guests.push(this.addGuestControl());
  }

  addGuestControl() {
    return this.fb.group({
      guestName: ['', { validators: [Validators.required] }],
      age: [''],
    });
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }

  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}

// export class Booking {
//   bookingId: string;
//   roomId: string;
//   guestEmail: string;
//   checkinDate: Date;
//   checkoutDate: Date;
//   bookingStatus: string;
//   bookingAmouunt: number;
//   bookingDate: Date;
//   mobileNumber: string;
//   guestName: string;
//   guestAddress: string;
//   guestCity: string;
//   guestState: string;
//   guestCountry: string;
//   guestZipCode: string;
//   guestCount: number;
//   guestList: Guest[];
// }
