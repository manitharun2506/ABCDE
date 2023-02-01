import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/custom-validators';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  ngOnInit(): void {
    this.getGlobalData();
    this.getAllLocations();
  }
  deleteId: any;
  start: any = 0;
  end: any = 5;
  searchText: any = '';
  editData: any = {};
  tableData: any = [];
  tableArray: any[] = [];
  showAddForm: boolean = true;
  showEditForm: boolean = false;
  submitted: boolean = false;
  formData: any = {};
  globalData: any = [];
  states: any = [];
  cities: any = [];
  locationForm: FormGroup = new FormGroup({
    country: new FormControl('', [Validators.required]),
    state: new FormControl(''),
    city: new FormControl(''),
    area: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
      CustomValidator.nameValidator,
    ]),
  });

  editlocationForm: FormGroup = new FormGroup({
    country: new FormControl('', [Validators.required]),
    state: new FormControl(''),
    city: new FormControl(''),
    area: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
      CustomValidator.nameValidator,
    ]),
  });

  constructor(private service: UserService) {}

  getGlobalData(): void {
    this.service.getGlobalData().subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        this.globalData = res;
      },
    });
  }
  getStates(event: any): void {
    this.globalData.forEach((e: any) => {
      if (event.target.value === e.country) {
        this.states = e.states;
      }
    });
  }
  getEditStates(data: any): void {
    this.globalData.forEach((e: any) => {
      if (data === e.country) {
        this.states = e.states;
      }
    });
  }
  getCities(event: any) {
    this.states.forEach((e: any) => {
      if (event.target.value === e.name) {
        this.cities = e.cities;
      }
    });
  }
  getEditCities(data: any) {
    this.states.forEach((e: any) => {
      if (data === e.name) {
        this.cities = e.cities;
      }
    });
  }
  submit(): void {
    this.submitted = true;
    this.formData = {
      country: this.locationForm.get('country')?.value,
      state: this.locationForm.get('state')?.value,
      city: this.locationForm.get('city')?.value,
      area: this.locationForm.get('area')?.value,
    };

    if (this.locationForm.valid) {
      this.service.addLocation(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.message, false);
        },
        next: (res: any) => {
          this.submitted = false;
          toast(res.msg, true);
          this.locationForm.reset();
          this.getAllLocations();
        },
      });
    } else {
      toast('Enter valid data', false);
    }
  }

  getAllLocations(): void {
    this.service.getLocations().subscribe({
      next: (res: any) => {
        this.tableData = res;
        this.tableArray = this.tableData.slice(this.start, this.end);
      },
    });
  }

  getUpdateData(data: any) {
    this.editData = data;
    this.showAddForm = false;
    this.showEditForm = true;
    this.getEditStates(this.editData.country);
    this.getEditCities(this.editData.state);
    this.editlocationForm.patchValue({
      country: this.editData.country,
      state: this.editData.state,
      city: this.editData.city,
      area: this.editData.area,
    });
  }

  updateData() {
    this.submitted = true;
    this.formData = {
      country: this.editlocationForm.get('country')?.value,
      state: this.editlocationForm.get('state')?.value,
      city: this.editlocationForm.get('city')?.value,
      area: this.editlocationForm.get('area')?.value,
      _id: this.editData._id,
    };
    if (this.editlocationForm.valid) {
      this.service.updateLocation(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          this.submitted = false;
          toast(res.msg, true);
          this.cancel();
          this.getAllLocations();
        },
      });
    } else {
      toast('Please enter valid details', false);
    }
  }
  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }

  showModal(id: any) {
    this.deleteId = id;
  }

  deleteLocation() {
    this.service.deleteLocation(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getAllLocations();
      },
    });
  }
}
