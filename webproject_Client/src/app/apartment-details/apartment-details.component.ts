import { Component, OnInit } from '@angular/core';
import { IApartment } from '../apartments-list/apartment';
import {ApartmentDetailsService} from "./apartment-details.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.css'],
  providers: [ApartmentDetailsService]
})
export class ApartmentDetailsComponent implements OnInit {

  apartment: IApartment;
  constructor(private _apartmentDetailsService: ApartmentDetailsService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this.getApartment(id);
  }


  getApartment(id: number): void {
    this._apartmentDetailsService.getApartment(id).subscribe(
      (apartment: IApartment)=> {
        console.log(apartment);
        this.apartment = apartment;
      }, (error)=> {
        console.log(error);
      });
  }

  onBack(): void {
    this._router.navigate(['/apartments']);
  }

}
