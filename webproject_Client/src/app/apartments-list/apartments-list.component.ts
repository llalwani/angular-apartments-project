import { Component, OnInit } from '@angular/core';
import {ApartmentsListService} from "./apartments-list-service.service";
import { IApartment } from '../shared/apartment';

@Component({
  selector: 'app-apartments-list',
  templateUrl: './apartments-list.component.html',
  styleUrls: ['./apartments-list.component.css'],
  providers: []

})
export class ApartmentsListComponent implements OnInit {

  apartments: IApartment[];
  filteredApartments: IApartment[];

  _listFilter: string;
  sortBy: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredApartments = this.listFilter ? this.performFilter(this.listFilter) : this.apartments;
  }

  constructor(private _apartmentService: ApartmentsListService) {
    this.sortBy = 'none';
  }
    ngOnInit() {
    this.onLoadApartments();
  }

  // set sortBy(value: string) {
  //   if(value !== this._sortBy) {
  //     this._sortBy = value;
  //     if(this.sortBy === 'price') {
  //       this.filteredApartments.sort(this.sortByPriceAsc);
  //     }
  //   }
  // }


  onLoadApartments(){
    this._apartmentService.getApartments().subscribe(
      (apartments: any[])=> {
          console.log(apartments);
          this.apartments = apartments;
          this.filteredApartments = apartments;
      }, (error)=> {
        console.log(error);
      });
  }

  performFilter(filterBy: string): IApartment[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.apartments.filter((apartment: IApartment) =>
      apartment.Address.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  private sortByPriceAsc(s1: IApartment, s2: IApartment) {
    if(s1.Price > s2.Price) return 1;
    else if(s1.Price === s2.Price) return 0;
    else return -1;
  }

  private sortByAddress(s1: IApartment, s2: IApartment) {
    if(s1.Address > s2.Address) return 1;
    else if(s1.Address === s2.Address) return 0;
    return -1;
  }

  changeSorting(sort: string) {
    if(sort !== this.sortBy) {
      this.sortBy = sort;
      this.sortBy === 'price' ? this.filteredApartments.sort(this.sortByPriceAsc): this.filteredApartments.sort(this.sortByAddress);
    }
  }
}
