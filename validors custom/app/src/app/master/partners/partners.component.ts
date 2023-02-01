import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';
import { envi } from 'src/environments';
import { CustomValidator } from 'src/app/custom-validators';
@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css'],
})
export class PartnersComponent implements OnInit {
  envirment: any = {};
  ngOnInit(): void {
    this.getGlobalData();
    this.getAllPartners();
    this.envirment = envi;
    this.editForm.get('phone_number')?.valueChanges.subscribe((value: any) => {
      value = Number(value);
      if (this.editData.phone_number === value) {
        this.editForm.get('phone_number')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.phone_number === value) {
            this.editForm
              .get('phone_number')
              ?.setErrors({ alreadyExists: true });
            this.duplicateEditType = true;
          } else {
            this.duplicateEditType = false;
          }
        });
      }
    });
    this.editForm.get('gov_id')?.valueChanges.subscribe((value: any) => {
      if (this.editData.gov_id === value) {
        this.editForm.get('gov_id')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.gov_id === value) {
            this.editForm.get('gov_id')?.setErrors({ alreadyExists: true });
            this.govId = true;
          } else {
            this.govId = false;
          }
        });
      }
    });
  }
  imgmsg:string = '';
  govId: boolean = false;
  showAddForm: boolean = true;
  showEditForm: boolean = false;
  editData: any;
  deleteId: any;
  tableArray: any = [];
  tableData: any = [];
  start: any = 0;
  end: any = 5;
  searchText: any = '';
  modalData: any = [];
  submitted: boolean = false;
  formData: any;
  globalData: any = [];
  states: any = [];
  cities: any = [];
  selectedFile: any;
  duplicateEditType: boolean = false;
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
  getEditCities(data:any) {
    this.states.forEach((e: any) => {
      if (data === e.name) {
        this.cities = e.cities;
      }
    });
  }
  selectFile(event: any) {
    this.selectedFile = event.target.files[0];
  }
  constructor(private service: UserService) {}
  addForm: FormGroup = new FormGroup({
    partner_name: new FormControl('', [
      Validators.required,
      CustomValidator.nameValidator,
      CustomValidator.noWhitespaceValidator,
    ]),
    phone_number: new FormControl('', [
      Validators.required,
      CustomValidator.phoneNumberValidator,
    ]),
    alt_phone_num: new FormControl(''),
    gov_id: new FormControl('', [
      Validators.required,
      CustomValidator.aadharValidator,
    ]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
    ]),
    photo: new FormControl('', [Validators.required]),
    opening_amount: new FormControl('', [
      Validators.required,
      CustomValidator.negativeNumberValidator,
    ]),
    opening_date: new FormControl('', [Validators.required]),
    // contract details
    startdate: new FormControl(''),
    enddate: new FormControl(''),
    note: new FormControl(''),
  });

  editForm: FormGroup = new FormGroup({
    partner_name: new FormControl('', [
      Validators.required,
      CustomValidator.nameValidator,
      CustomValidator.noWhitespaceValidator,
    ]),
    phone_number: new FormControl('', [
      Validators.required,
      CustomValidator.phoneNumberValidator,
    ]),
    alt_phone_num: new FormControl(''),
    gov_id: new FormControl('', [
      Validators.required,
      CustomValidator.aadharValidator,
    ]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
    ]),
    photo: new FormControl('', [Validators.required]),
    opening_amount: new FormControl('', [
      Validators.required,
      CustomValidator.negativeNumberValidator,
    ]),
    opening_date: new FormControl('', [Validators.required]),
    // contract details
    startdate: new FormControl(''),
    enddate: new FormControl(''),
    note: new FormControl(''),
  });

  submit() {
    // console.log(this.addForm);
    this.submitted = true;
    let formData = new FormData();
    formData.append('photo', this.selectedFile);
    formData.append('partner_name', this.addForm.get('partner_name')?.value);
    formData.append('phone_number', this.addForm.get('phone_number')?.value);
    formData.append('alt_phone_num', this.addForm.get('alt_phone_num')?.value);
    formData.append('gov_id', this.addForm.get('gov_id')?.value);
    formData.append('country', this.addForm.get('country')?.value);
    formData.append('state', this.addForm.get('state')?.value);
    formData.append('city', this.addForm.get('city')?.value);
    formData.append('address', this.addForm.get('address')?.value);
    formData.append(
      'opening_amount',
      this.addForm.get('opening_amount')?.value
    );
    formData.append('opening_date', this.addForm.get('opening_date')?.value);
    formData.append('startdate', this.addForm.get('startdate')?.value);
    formData.append('enddate', this.addForm.get('enddate')?.value);
    formData.append('note', this.addForm.get('note')?.value);

    if (this.addForm.valid) {
      this.service.addPartner(formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.getAllPartners();
          this.addForm.reset();
        },
      });
    } else {
      toast('please enter valid details', false);
    }
  }

  getAllPartners() {
    this.service.getPartner().subscribe({
      next: (res: any) => {
        this.tableArray = res;
        this.tableData = this.tableArray.slice(this.start, this.end);
      },
    });
  }
  modalTable(data: any) {
    this.modalData = data;
  }

  deleteModal(id: any) {
    this.deleteId = id;
  }

  deletePartner() {
    this.service.deletePartner(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getAllPartners();
      },
    });
  }

  getEditData(data: any) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.editData = data;
    this.getEditStates(this.editData.country)
    this.getEditCities(this.editData.state)
    this.imgmsg = this.editData.photo;
    this.editForm.patchValue({
      partner_name: this.editData.partner_name,
      phone_number: this.editData.phone_number,
      alt_phone_num: this.editData.alt_phone_num,
      gov_id: this.editData.gov_id,
      country: this.editData.country,
      state: this.editData.state,
      city: this.editData.city,
      address: this.editData.address,
      opening_amount: this.editData.opening_amount,
      opening_date: this.editData.opening_date,
      // contract details
      startdate: this.editData.startdate,
      enddate: this.editData.enddate,
      note: this.editData.note,
    });
  }
  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }
  updatePartner() {
    this.submitted = true;
    let editformData = new FormData();
    editformData.append('photo', this.selectedFile);
    editformData.append(
      'partner_name',
      this.editForm.get('partner_name')?.value
    );
    editformData.append(
      'phone_number',
      this.editForm.get('phone_number')?.value
    );
    editformData.append(
      'alt_phone_num',
      this.editForm.get('alt_phone_num')?.value
    );
    editformData.append('gov_id', this.editForm.get('gov_id')?.value);
    editformData.append('country', this.editForm.get('country')?.value);
    editformData.append('state', this.editForm.get('state')?.value);
    editformData.append('city', this.editForm.get('city')?.value);
    editformData.append('address', this.editForm.get('address')?.value);
    editformData.append(
      'opening_amount',
      this.editForm.get('opening_amount')?.value
    );
    editformData.append(
      'opening_date',
      this.editForm.get('opening_date')?.value
    );
    editformData.append('startdate', this.editForm.get('startdate')?.value);
    editformData.append('enddate', this.editForm.get('enddate')?.value);
    editformData.append('note', this.editForm.get('note')?.value);
    editformData.append('_id', this.editData._id);
    if (this.duplicateEditType === true) {
      toast('Phone Number Already Exists', false);
    } else if (this.govId === true) {
      toast('GovID Already Exists', false);
    } else if (
      this.editForm.valid &&
      this.duplicateEditType === false &&
      this.govId === false
    ) {
      this.service.updatePartner(editformData, this.editData._id).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.cancel();
          this.submitted = false;
          this.getAllPartners();
        },
      });
    } else {
      toast('Please enter valid details', false);
    }
  }
}
