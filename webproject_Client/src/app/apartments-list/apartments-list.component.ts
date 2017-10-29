import { Component, OnInit } from '@angular/core';
import {ApartmentsListService} from "./apartments-list-service.service";
import { IApartment } from '../shared/apartment';
import {AlertService} from "../alert/alert.service";
import {Marker} from "../shared/marker";
import * as _ from 'lodash'
import {Router} from "@angular/router";

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
  tabIndex: number = 0;

  markers: Marker[];

  isActive: boolean;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredApartments = this.listFilter ? this.performFilter(this.listFilter) : this.apartments;
  }

  constructor(private _apartmentService: ApartmentsListService,
              private _alertService: AlertService,
              private _router: Router) {
    this.sortBy = 'none';
  }
    ngOnInit() {
    this.markers = [];
    this.onLoadApartments();
  }

  onLoadApartments() {
    this._apartmentService.getApartments().subscribe(
      (apartments: IApartment[]) => {
        console.log(apartments);
        this.apartments = apartments;
        this.filteredApartments = apartments;
        this.prepareMarkers();
      }, (error) => {
        if (error.status === 0) {
          this._alertService.error('Failed to connect to server!');

        }
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

  prepareMarkers(): void {
    _.forEach(this.apartments, (apartment: IApartment) => {
      let m: Marker = {
        lat: 0,
        lng: 0,
        label: ""
      };
      m.lat = apartment.Lat;
      m.lng = apartment.Lng;
      m.label = apartment.Price.toString();
      this.markers.push(m);
    });
  }

  onSelectedIndexChange(newTabIndex) {
      if(this.tabIndex !== newTabIndex) {
        this.tabIndex = newTabIndex;
      }
  }
  clickedMarker(marker: Marker) {
    const apartment: IApartment = _.find(this.apartments, function(o) {
        return o.Lng === marker.lng && o.Lat === marker.lat;
    });
    if(!apartment) {
      alert('cant find apartment!!');
      return;
    }
    this._router.navigate(['/apartments', apartment.Id]);

  }
}
