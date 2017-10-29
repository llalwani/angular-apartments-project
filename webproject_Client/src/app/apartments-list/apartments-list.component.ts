import { Component, OnInit } from '@angular/core';
import {ApartmentsListService} from "./apartments-list-service.service";
import { IApartment } from '../shared/apartment';
import {AlertService} from "../alert/alert.service";
import {Marker} from "../shared/marker";
import * as _ from 'lodash'
import {Router} from "@angular/router";
import {Sort} from "@angular/material";

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
  tabIndex: number = 0;

  markers: Marker[];
  sortedApartments: IApartment[];
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.sortedApartments = this.listFilter ? this.performFilter(this.listFilter) : this.apartments;
  }

  constructor(private _apartmentService: ApartmentsListService,
              private _alertService: AlertService,
              private _router: Router) {
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
        this.sortedApartments = this.apartments.slice();
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

  sortData(sort: Sort) {
    const data = this.apartments.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedApartments = data;
      return;
    }

    this.sortedApartments = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'address': return this.compare(a.Address, b.Address, isAsc);
        case 'description': return this.compare(+a.Description, +b.Description, isAsc);
        case 'price': return this.compare(+a.Price, +b.Price, isAsc);
        case 'aptSize': return this.compare(+a.apartmentSize, +b.apartmentSize, isAsc);
        case 'roomsNumber': return this.compare(+a.RoomsNumber, +b.RoomsNumber, isAsc);

        default: return 0;
      }
    });
  }

   private compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
