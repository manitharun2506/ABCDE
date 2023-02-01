import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';
import { CustomValidator } from 'src/app/custom-validators';
import { envi } from 'src/environments';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  envirment: any = {};
  ngOnInit(): void {
    this.getGlobalData();
    this.getAllCustomers();
    this.envirment = envi;
    this.editForm.get('ph_no')?.valueChanges.subscribe((value: any) => {
      value = Number(value);
      if (this.editData.ph_no === value) {
        this.editForm.get('ph_no')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.ph_no === value) {
            this.editForm.get('ph_no')?.setErrors({ alreadyExist: true });
            this.duplicateedit = true;
          } else {
            this.duplicateedit = false;
          }
        });
      }
    });

    this.editForm.get('alt_ph_no')?.valueChanges.subscribe((value: any) => {
      value = Number(value);
      if (this.editData.alt_ph_no === value) {
        this.editForm.get('alt_ph_no')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.alt_ph_no === value) {
            this.editForm.get('alt_ph_no')?.setErrors({ alreadyExist: true });
            this.duplicateedit = true;
          } else {
            this.duplicateedit = false;
          }
        });
      }
    });
  }
  imginfo: string = '';
  duplicateedit: boolean = false;
  showAddForm: boolean = true;
  showEditForm: boolean = false;
  editData: any;
  deleteId: any;
  start: any = 0;
  end: any = 5;
  searchText: any = '';
  tableData: any = [];
  tableArray: any = [];
  selectedFile: any;
  globalData: any = [];
  states: any = [];
  cities: any = [];
  submitted: boolean = false;
  addForm: FormGroup = new FormGroup({
    cust_name: new FormControl('', [
      Validators.required,
      CustomValidator.nameValidator,
      CustomValidator.noWhitespaceValidator,
    ]),
    ph_no: new FormControl('', [
      Validators.required,
      CustomValidator.phoneNumberValidator,
    ]),
    alt_ph_no: new FormControl('', [
      Validators.required,
      CustomValidator.phoneNumberValidator,
    ]),
    photo: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
    ]),
    openingAmount: new FormControl('', [
      Validators.required,
      CustomValidator.negativeNumberValidator,
    ]),
    openingDate: new FormControl('', [Validators.required]),
  });

  editForm: FormGroup = new FormGroup({
    cust_name: new FormControl('', [
      Validators.required,
      CustomValidator.nameValidator,
      CustomValidator.noWhitespaceValidator,
    ]),
    ph_no: new FormControl('', [
      Validators.required,
      CustomValidator.phoneNumberValidator,
    ]),
    alt_ph_no: new FormControl('', [
      Validators.required,
      CustomValidator.phoneNumberValidator,
    ]),
    photo: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
    ]),
    openingAmount: new FormControl('', [
      Validators.required,
      CustomValidator.negativeNumberValidator,
    ]),
    openingDate: new FormControl('', [Validators.required]),
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

  getStates(event: any) {
    this.globalData.forEach((e: any) => {
      if (event.target.value === e.country) {
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

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addCustomer() {
    console.log(this.addForm);
    this.submitted = true;
    let formData = new FormData();
    formData.append('photo', this.selectedFile);
    formData.append('cust_name', this.addForm.get('cust_name')?.value);
    formData.append('ph_no', this.addForm.get('ph_no')?.value);
    formData.append('alt_ph_no', this.addForm.get('alt_ph_no')?.value);
    formData.append('city', this.addForm.get('city')?.value);
    formData.append('address', this.addForm.get('address')?.value);
    formData.append('openingAmount', this.addForm.get('openingAmount')?.value);
    formData.append('openingDate', this.addForm.get('openingDate')?.value);

    if (this.addForm.valid) {
      this.service.addCustomer(formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.getAllCustomers();
          this.addForm.reset();
        },
      });
    } else {
      toast('Please enter valid details', false);
    }
  }

  getAllCustomers() {
    this.service.getCustomers().subscribe({
      next: (res: any) => {
        this.tableArray = res;
        this.tableData = this.tableArray.slice(this.start, this.end);
      },
    });
  }
  getDeleteId(id: any) {
    this.deleteId = id;
  }
  deleteCustomer() {
    this.service.deleteCustomer(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getAllCustomers();
      },
    });
  }

  getEditData(data: any) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.editData = data;

    this.imginfo = this.editData.photo;
    this.editForm.patchValue({
      cust_name: this.editData.cust_name,
      ph_no: this.editData.ph_no,
      alt_ph_no: this.editData.alt_ph_no,
      city: this.editData.city,
      address: this.editData.address,
      openingAmount: this.editData.openingAmount,
      openingDate: this.editData.openingDate,
    });
  }

  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }
  updateCustomer() {
    this.submitted = true;
    let editformData = new FormData();
    editformData.append('photo', this.selectedFile);
    editformData.append('cust_name', this.editForm.get('cust_name')?.value);
    editformData.append('ph_no', this.editForm.get('ph_no')?.value);
    editformData.append('alt_ph_no', this.editForm.get('alt_ph_no')?.value);
    editformData.append('city', this.editForm.get('city')?.value);
    editformData.append('address', this.editForm.get('address')?.value);
    editformData.append(
      'openingAmount',
      this.editForm.get('openingAmount')?.value
    );
    editformData.append('openingDate', this.editForm.get('openingDate')?.value);
    editformData.append('_id', this.editData._id);

    if (this.editForm.valid && this.duplicateedit === false) {
      this.service.updateCustomer(editformData, this.editData._id).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.getAllCustomers();
          this.cancel();
        },
      });
    } else {
      toast(
        'Input should be filled (or) phone(or)Alt Ph Number Already taken',
        false
      );
    }
  }
}
