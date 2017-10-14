import { Component, OnInit } from '@angular/core';
import {IApartment} from "../shared/apartment";
import {Router} from "@angular/router";
import {AddApartmentService} from "./add-apartment.service";

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css'],
  providers: [AddApartmentService]
})
export class AddApartmentComponent implements OnInit {
  loading = false;
  model: IApartment = {
    Id: 0,
    Address: '',
    Description: '',
    Price: 0
  };
  constructor(private _router: Router,
              private _addApartmentService: AddApartmentService) { }

  ngOnInit() {
  }

  addApartment() {
    this.loading = true;
    this._addApartmentService.addApartment(this.model)
      .subscribe((response) => {
        this._router.navigate(['/apartments']);

      }, (error) => {
        this.loading = false;
      });
  }

}
