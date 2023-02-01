import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';

@Component({
  selector: 'app-spareparts',
  templateUrl: './spareparts.component.html',
  styleUrls: ['./spareparts.component.css'],
})
export class SparepartsComponent implements OnInit {
  ngOnInit(): void {
    this.getGlobalData();
    this.getAllCategories();
    this.getAllSuppliers();
    this.getAllSpares();
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
  duplicateedit: boolean = false;
  showAddForm: boolean = true;
  showEditForm: boolean = false;
  editData: any = {};
  deleteId: any = '';
  changeStatus: any = {};
  tableArray: any = [];
  tableData: any = [];
  searchText: any = '';
  start: any = 0;
  end: any = 5;
  formData: any = {};
  categories: any = [];
  suppliers: any = [];
  globalData: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  submitted: boolean = false;
  addForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    sparename: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    expirydate: new FormControl('', [Validators.required]),
    purchaseprice: new FormControl('', [Validators.required]),
    purchasedate: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
  });

  editForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    sparename: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    expirydate: new FormControl('', [Validators.required]),
    purchaseprice: new FormControl('', [Validators.required]),
    purchasedate: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
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

  getAllCategories() {
    this.service.getAllCategory().subscribe({
      next: (res: any) => {
        this.categories = res;
      },
    });
  }
  getAllSuppliers() {
    this.service.getAllSuppliers().subscribe({
      next: (res: any) => {
        this.suppliers = res;
      },
    });
  }

  submit() {
    this.submitted = true;
    this.formData = {
      date: this.addForm.get('date')?.value,
      category: this.addForm.get('category')?.value,
      sparename: this.addForm.get('sparename')?.value,
      code: this.addForm.get('code')?.value,
      expirydate: this.addForm.get('expirydate')?.value,
      purchaseprice: this.addForm.get('purchaseprice')?.value,
      purchasedate: this.addForm.get('purchasedate')?.value,
      supplier: this.addForm.get('supplier')?.value,
      status: this.addForm.get('status')?.value,
      country: this.addForm.get('country')?.value,
      state: this.addForm.get('state')?.value,
      city: this.addForm.get('city')?.value,
      area: this.addForm.get('area')?.value,
    };
    if (this.addForm.valid) {
      this.service.addSpares(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.getAllSpares();
          this.addForm.reset();
        },
      });
    } else {
      toast('please enter valid details', false);
    }
  }

  getAllSpares() {
    this.service.getAllSpares().subscribe({
      next: (res: any) => {
        this.tableArray = res;
        this.tableData = this.tableArray.slice(this.start, this.end);
      },
    });
  }

  status(event: any, id: string) {
    this.changeStatus = {
      status: event.target.value,
      _id: id,
    };
    this.service.updateSpare(this.changeStatus).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getAllSpares();
      },
    });
  }

  getDeleteId(id: string) {
    this.deleteId = id;
  }
  deleteSpare() {
    this.service.deleteSpare(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getAllSpares();
      },
    });
  }

  getEditData(data: any) {
    this.editData = data;
    this.showAddForm = false;
    this.showEditForm = true;
    this.editForm.patchValue({
      date: this.editData.date,
      category: this.editData.category,
      sparename: this.editData.sparename,
      code: this.editData.code,
      expirydate: this.editData.expirydate,
      purchaseprice: this.editData.purchaseprice,
      purchasedate: this.editData.purchasedate,
      supplier: this.editData.supplier,
      status: this.editData.status,
      country: this.editData.country,
      state: this.editData.state,
      city: this.editData.city,
      area: this.editData.area,
    });
  }
  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }
  updateSpare() {
    this.submitted = true;
    this.formData = {
      date: this.editForm.get('date')?.value,
      category: this.editForm.get('category')?.value,
      sparename: this.editForm.get('sparename')?.value,
      code: this.editForm.get('code')?.value,
      expirydate: this.editForm.get('expirydate')?.value,
      purchaseprice: this.editForm.get('purchaseprice')?.value,
      purchasedate: this.editForm.get('purchasedate')?.value,
      supplier: this.editForm.get('supplier')?.value,
      status: this.editForm.get('status')?.value,
      country: this.editForm.get('country')?.value,
      state: this.editForm.get('state')?.value,
      city: this.editForm.get('city')?.value,
      area: this.editForm.get('area')?.value,
      _id: this.editData._id,
    };
    if (this.editForm.valid && this.duplicateedit === false) {
      this.service.updateSpare(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.getAllSpares();
        },
      });
    } else {
      toast(
        'input fields must be filled (or) spare Code Already exists',
        false
      );
    }
  }
}
