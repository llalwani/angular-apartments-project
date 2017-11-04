import {Component, Inject, OnInit} from '@angular/core';
import { IApartment } from '../shared/apartment';
import {ApartmentDetailsService} from "./apartment-details.service";
import {ActivatedRoute, Router} from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.css'],
  providers: []
})
  export class ApartmentDetailsComponent implements OnInit {

  apartment: IApartment;
  lat: number = 32;
  lng: number = 34.9;
  sanitizedImageData: any;


  constructor(private _apartmentDetailsService: ApartmentDetailsService,
              private _route: ActivatedRoute,
              private _router: Router,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog) { }

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


  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {img: this.sanitizedImageData},
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
