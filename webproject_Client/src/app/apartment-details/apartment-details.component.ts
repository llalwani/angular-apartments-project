import { Component, OnInit } from '@angular/core';
import { IApartment } from '../shared/apartment';
import {ApartmentDetailsService} from "./apartment-details.service";
import {ActivatedRoute, Router} from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.css'],
  providers: [ApartmentDetailsService]
})
export class ApartmentDetailsComponent implements OnInit {

  apartment: IApartment;
  lat: number = 32;
  lng: number = 34.9;
  sanitizedImageData: any;


  constructor(private _apartmentDetailsService: ApartmentDetailsService,
              private _route: ActivatedRoute,
              private _router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this.getApartment(id);
  }


  getApartment(id: number): void {
    this._apartmentDetailsService.getApartment(id).subscribe(
      (apartment: IApartment)=> {
        console.log(apartment);
        this.apartment = apartment;
        if(this.apartment.Images && this.apartment.Images[0]) {
      //    this.apartment.Images[0].ImageData = this._arrayBufferToBase64(this.apartment.Images[0].ImageData);
          this.sanitizedImageData = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.apartment.Images[0].ImageDataBase64);
        }


      }, (error)=> {
        console.log(error);
      });
  }


   private _arrayBufferToBase64( buffer: any ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }
  onBack(): void {
    this._router.navigate(['/apartments']);
  }

}
