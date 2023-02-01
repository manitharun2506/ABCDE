import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/custom-validators';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css'],
})
export class EquipmentsComponent implements OnInit {
  ngOnInit(): void {
    this.getGlobalData();
    this.getPartners();
    this.getAllEquipments();

    this.editForm.get('eq_name')?.valueChanges.subscribe((value: any) => {
      if (this.editData.eq_name === value) {
        this.editForm.get('eq_name')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.eq_name === value) {
            this.editForm.get('eq_name')?.setErrors({ alreadyExist: true });
            this.duplicateedit = true;
          } else {
            this.duplicateedit = false;
          }
        });
      }
    });

    this.editForm.get('code')?.valueChanges.subscribe((value: any) => {
      if (this.editData.code === value) {
        this.editForm.get('code')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.code === value) {
            this.editForm.get('code')?.setErrors({ alreadyExist: true });
            this.duplicateedit = true;
          } else {
            this.duplicateedit = false;
          }
        });
      }
    });
  }
  isCode: boolean = false;
  isEquipment: boolean = false;
  duplicateedit: boolean = false;
  showAddForm: boolean = true;
  showEditForm: boolean = false;
  editData: any;
  deleteId: any;
  changeStatus: any = {};
  tableArray: any = [];
  tableData: any = [];
  start: any = 0;
  end: any = 5;
  searchText: any = '';
  submitted: boolean = false;
  partners: any[] = [];
  globalData: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  formData: any = {};
  addForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    eq_name: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
      CustomValidator.nameValidator,
    ]),
    code: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
    ]),
    manufacturer: new FormControl(''),
    purchaseprice: new FormControl('', [
      Validators.required,
      CustomValidator.negativeNumberValidator,
    ]),
    warentydate: new FormControl(''),
    owernership: new FormControl('', [Validators.required]),
    partner: new FormControl(''),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    area: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
    ]),
    status: new FormControl('', [Validators.required]),
  });
  editForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    eq_name: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
      CustomValidator.nameValidator,
    ]),
    code: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
    ]),
    manufacturer: new FormControl(''),
    purchaseprice: new FormControl('', [
      Validators.required,
      CustomValidator.negativeNumberValidator,
    ]),
    warentydate: new FormControl(''),
    owernership: new FormControl('', [Validators.required]),
    partner: new FormControl(''),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    area: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
    ]),
    status: new FormControl('', [Validators.required]),
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

  getEditStates(data: any): void {
    this.globalData.forEach((e: any) => {
      if (data === e.country) {
        this.states = e.states;
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
  getCities(event: any) {
    this.states.forEach((e: any) => {
      if (event.target.value === e.name) {
        this.cities = e.cities;
      }
    });
  }

  getPartners() {
    this.service.getPartner().subscribe({
      next: (res: any) => {
        this.partners = res;
      },
    });
  }
  submit() {
    this.submitted = true;
    this.formData = {
      date: this.addForm.get('date')?.value,
      eq_name: this.addForm.get('eq_name')?.value,
      code: this.addForm.get('code')?.value,
      manufacturer: this.addForm.get('manufacturer')?.value,
      purchaseprice: this.addForm.get('purchaseprice')?.value,
      warentydate: this.addForm.get('warentydate')?.value,
      owernership: this.addForm.get('owernership')?.value,
      partner: this.addForm.get('partner')?.value,
      country: this.addForm.get('country')?.value,
      state: this.addForm.get('state')?.value,
      city: this.addForm.get('city')?.value,
      area: this.addForm.get('area')?.value,
      status: this.addForm.get('status')?.value,
    };
    if (this.addForm.valid) {
      this.service.addEquipment(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.addForm.reset();
          this.getAllEquipments();
        },
      });
    } else {
      toast('Please enter valid details', false);
    }
  }

  getAllEquipments() {
    this.service.getAllEquipments().subscribe({
      next: (res: any) => {
        this.tableArray = res;
        this.tableData = this.tableArray.slice(this.start, this.end);
      },
    });
  }

  status(id: string, event: any) {
    this.changeStatus = {
      status: event.target.value,
      _id: id,
    };

    this.service.updateEquipment(this.changeStatus).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getAllEquipments();
      },
    });
  }

  getDeleteId(id: any) {
    this.deleteId = id;
  }
  deleteEquipment() {
    this.service.deleteEquipment(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getAllEquipments();
      },
    });
  }

  getEditData(data: any) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.editData = data;
    this.getEditStates(this.editData.country);
    this.getEditCities(this.editData.state);
    this.editForm.patchValue({
      date: this.editData.date,
      eq_name: this.editData.eq_name,
      code: this.editData.code,
      manufacturer: this.editData.manufacturer,
      purchaseprice: this.editData.purchaseprice,
      warentydate: this.editData.warentydate,
      owernership: this.editData.owernership,
      partner: this.editData.partner,
      country: this.editData.country,
      state: this.editData.state,
      city: this.editData.city,
      area: this.editData.area,
      status: this.editData.status,
    });
  }

  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }

  updateEquipment() {
    this.submitted = true;
    this.formData = {
      date: this.editForm.get('date')?.value,
      eq_name: this.editForm.get('eq_name')?.value,
      code: this.editForm.get('code')?.value,
      manufacturer: this.editForm.get('manufacturer')?.value,
      purchaseprice: this.editForm.get('purchaseprice')?.value,
      warentydate: this.editForm.get('warentydate')?.value,
      owernership: this.editForm.get('owernership')?.value,
      partner: this.editForm.get('partner')?.value,
      country: this.editForm.get('country')?.value,
      state: this.editForm.get('state')?.value,
      city: this.editForm.get('city')?.value,
      area: this.editForm.get('area')?.value,
      status: this.editForm.get('status')?.value,
      _id: this.editData._id,
    };

    if (this.editForm.valid && this.duplicateedit === false) {
      this.service.updateEquipment(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.cancel();
          this.getAllEquipments();
        },
      });
    } else {
      toast(
        'All Fields must be filled or equipment name (or) code already exists',
        false
      );
    }
  }

  check(event: any) {
    const dup_Eq = this.tableArray.find((e: any) => {
      return e.eq_name.includes(event.target.value);
    });
    if (dup_Eq) {
      this.isEquipment = true;
    } else {
      this.isEquipment = false;
    }
  }
  check2(event: any) {
    const dup_Eq = this.tableArray.find((e: any) => {
      return e.code.includes(event.target.value);
    });
    if (dup_Eq) {
      this.isCode = true;
    } else {
      this.isCode = false;
    }
  }
}
