import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';
import { envi } from 'src/environments';
import { CustomValidator } from 'src/app/custom-validators';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit {
  selectedFile: any;
  currentFile: any;
  ngOnInit(): void {
    this.getGlobalData();
    this.getAllSuppliers();
    this.envirment = envi;
    this.checkValidation();
  }
  uploadedFile: string = '';
  envirment: any = {};
  showAddForm: boolean = true;
  showEditForm: boolean = false;
  editData: any;
  start: any = 0;
  end: any = 5;
  deleteId: any;
  searchText: any = '';
  submitted: boolean = false;
  globalData: any = [];
  states: any = [];
  cities: any = [];

  tableData: any = [];
  tableArray: any = [];
  addForm: FormGroup = new FormGroup({
    supplier_name: new FormControl('', [
      Validators.required,
      CustomValidator.nameValidator,
      CustomValidator.noWhitespaceValidator,
    ]),
    phone_number: new FormControl('', [
      Validators.required,
      CustomValidator.phoneNumberValidator,
    ]),
    alternate_Ph_number: new FormControl(''),
    country: new FormControl('', [Validators.required]),
    state: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
    ]),
    photo: new FormControl('', [Validators.required]),
    opening_amount: new FormControl(''),
    opening_date: new FormControl(''),
  });

  editForm: FormGroup = new FormGroup({
    supplier_name: new FormControl('', [
      Validators.required,
      CustomValidator.nameValidator,
      CustomValidator.noWhitespaceValidator,
    ]),
    phone_number: new FormControl('', [
      Validators.required,
      CustomValidator.phoneNumberValidator,
    ]),
    alternate_Ph_number: new FormControl(''),
    country: new FormControl('', [Validators.required]),
    state: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
    ]),
    photo: new FormControl(''),
    opening_amount: new FormControl(''),
    opening_date: new FormControl(''),
  });

  checkValidation() {
    // this.addForm.get('opening_amount')?.valueChanges.subscribe((value: any) => {
    //   if (value != '' && value != null) {
    //     this.addForm
    //       .get('opening_amount')
    //       ?.setValidators([
    //         Validators.required,
    //         CustomValidator.negativeNumberValidator,
    //       ]);
    //   } else {
    //     this.addForm.get('opening_amount')?.clearValidators();
    //   }
    //   this.addForm
    //     .get('opening_amount')
    //     ?.updateValueAndValidity({ emitEvent: false });
    // });

    this.addForm.get('opening_date')?.valueChanges.subscribe((value: any) => {
      if (value != '' && value != null) {
        this.addForm
          .get('opening_amount')
          ?.setValidators([
            Validators.required,
            CustomValidator.negativeNumberValidator,
          ]);
      } else {
        this.addForm.get('opening_amount')?.clearValidators();
      }
      this.addForm
        .get('opening_amount')
        ?.updateValueAndValidity({ emitEvent: false });
    });

    this.editForm
      .get('opening_amount')
      ?.valueChanges.subscribe((value: any) => {
        if (value != '' && value != null) {
          this.editForm
            .get('opening_amount')
            ?.setValidators([
              Validators.required,
              CustomValidator.negativeNumberValidator,
            ]);
        } else {
          this.editForm.get('opening_amount')?.clearValidators();
        }
        this.editForm
          .get('opening_amount')
          ?.updateValueAndValidity({ emitEvent: false });
      });

    this.editForm.get('opening_date')?.valueChanges.subscribe((value: any) => {
      if (value != '' && value != null) {
        this.editForm
          .get('opening_amount')
          ?.setValidators([
            Validators.required,
            CustomValidator.negativeNumberValidator,
          ]);
      } else {
        this.editForm.get('opening_amount')?.clearValidators();
      }
      this.editForm
        .get('opening_amount')
        ?.updateValueAndValidity({ emitEvent: false });
    });

    this.addForm
      .get('alternate_Ph_number')
      ?.valueChanges.subscribe((value: any) => {
        if (value != '' && value != null) {
          this.addForm
            .get('alternate_Ph_number')
            ?.setValidators([
              Validators.required,
              CustomValidator.phoneNumberValidator,
            ]);
        } else {
          this.addForm.get('alternate_Ph_number')?.clearValidators();
        }
        this.addForm
          .get('alternate_Ph_number')
          ?.updateValueAndValidity({ emitEvent: false });
      });

    this.editForm
      .get('alternate_Ph_number')
      ?.valueChanges.subscribe((value: any) => {
        if (value != '' && value != null) {
          this.editForm
            .get('alternate_Ph_number')
            ?.setValidators([
              Validators.required,
              CustomValidator.phoneNumberValidator,
            ]);
        } else {
          this.editForm.get('alternate_Ph_number')?.clearValidators();
        }
        this.editForm
          .get('alternate_Ph_number')
          ?.updateValueAndValidity({ emitEvent: false });
      });
  }

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
  selectFile(event: any) {
    this.selectedFile = event.target.files[0];
    this.currentFile = this.selectedFile;

    if (
      this.currentFile?.type != 'image/jpeg' &&
      this.currentFile?.type != 'image/JPEG' &&
      this.currentFile?.type != 'image/png' &&
      this.currentFile?.type != 'image/jpg' &&
      this.currentFile?.type != 'image/JPG' &&
      this.currentFile?.type != 'image/PNG'
    ) {
      // this.isFile = false;
      this.selectedFile = '';
      this.currentFile = '';
      this.addForm.get('photo')?.setValue('');

      toast('Please select image file', false);
    } else {
      // this.isFile = true;
      this.selectedFile = event.target.files[0];
    }
  }

  submit() {
    this.submitted = true;
    let formData = new FormData();
    formData.append('photo', this.selectedFile);
    formData.append('supplier_name', this.addForm.get('supplier_name')?.value);
    formData.append('phone_number', this.addForm.get('phone_number')?.value);
    formData.append(
      'alternate_Ph_number',
      this.addForm.get('alternate_Ph_number')?.value
    );
    formData.append('country', this.addForm.get('country')?.value);
    formData.append('state', this.addForm.get('state')?.value);
    formData.append('city', this.addForm.get('city')?.value);
    formData.append('address', this.addForm.get('address')?.value);
    formData.append(
      'opening_amount',
      this.addForm.get('opening_amount')?.value
    );
    formData.append('opening_date', this.addForm.get('opening_date')?.value);
    if (this.addForm.valid) {
      this.service.addSupplier(formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          this.submitted = false;
          toast(res.msg, true);
          this.selectedFile = null;
          this.getAllSuppliers();
          this.addForm.reset();
        },
      });
    } else {
      toast('Please Enter Valid Details', false);
    }
  }

  getAllSuppliers() {
    this.service.getAllSuppliers().subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        this.tableArray = res;
        this.tableData = this.tableArray.slice(this.start, this.end);
      },
    });
  }

  getUpdateData(data: any) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.editData = data;
    this.getEditStates(this.editData.country);
    this.getEditCities(this.editData.state);
    this.uploadedFile = this.editData.photo;
    this.editForm.patchValue({
      supplier_name: this.editData.supplier_name,
      phone_number: this.editData.phone_number,
      alternate_Ph_number: this.editData.alternate_Ph_number,
      country: this.editData.country,
      state: this.editData.state,
      city: this.editData.city,
      address: this.editData.address,
      opening_amount: this.editData.opening_amount,
      opening_date: this.editData.opening_date,
    });
  }

  showModal(id: any) {
    this.deleteId = id;
  }
  deleteSupplier() {
    this.service.deleteSupplier(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getAllSuppliers();
      },
    });
  }

  update() {
    this.submitted = true;
    console.log(this.selectedFile);
    console.log(this.editForm);
    if (this.selectedFile === undefined || this.selectedFile === null) {
      let supData = {
        supplier_name: this.editForm.get('supplier_name')?.value,
        phone_number: this.editData.phone_number,
        alternate_Ph_number: this.editData.alternate_Ph_number,
        country: this.editData.country,
        state: this.editData.state,
        city: this.editData.city,
        address: this.editData.address,
        opening_amount: this.editData.opening_amount,
        opening_date: this.editData.opening_date,
        photo: this.uploadedFile,
        _id: this.editData._id,
      };
      console.log(supData);
      if (this.editForm.valid) {
        this.service.editSupplier(supData).subscribe({
          error: (err: any) => {
            toast(err.error.msg, false);
          },
          next: (res: any) => {
            this.submitted = false;
            toast(res.msg, true);
            this.getAllSuppliers();
            this.cancel();
          },
        });
      } else {
        toast('Please Enter Valid Data', false);
      }
    } else {
      let formData = new FormData();

      formData.append('photo', this.selectedFile);
      formData.append(
        'supplier_name',
        this.editForm.get('supplier_name')?.value
      );
      formData.append('phone_number', this.editForm.get('phone_number')?.value);
      formData.append(
        'alternate_Ph_number',
        this.editForm.get('alternate_Ph_number')?.value
      );
      formData.append('country', this.editForm.get('country')?.value);
      formData.append('state', this.editForm.get('state')?.value);
      formData.append('city', this.editForm.get('city')?.value);
      formData.append('address', this.editForm.get('address')?.value);
      formData.append(
        'opening_amount',
        this.editForm.get('opening_amount')?.value
      );
      formData.append('opening_date', this.editForm.get('opening_date')?.value);
      formData.append('_id', this.editData._id);

      if (this.editForm.valid) {
        this.service.updateSupplier(formData, this.editData._id).subscribe({
          error: (err: any) => {
            toast(err.error.msg, false);
          },
          next: (res: any) => {
            this.submitted = false;
            toast(res.msg, true);
            this.selectedFile = null;
            this.getAllSuppliers();
            this.cancel();
          },
        });
      } else {
        toast('Please Enter Valid Data', false);
      }
    }
  }
  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }
}
