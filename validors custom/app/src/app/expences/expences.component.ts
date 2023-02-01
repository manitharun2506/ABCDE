import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import toast from 'src/toast';
import { UserService } from '../user.service';

@Component({
  selector: 'app-expences',
  templateUrl: './expences.component.html',
  styleUrls: ['./expences.component.css'],
})
export class ExpencesComponent implements OnInit {
  ngOnInit(): void {
    this.getAllExpences();
    this.getAllEquipments();
    this.getAllEmp();
    this.getAllShifts();
    this.getAllExpTypes();
  }
  constructor(private service: UserService) {}
  deleteId: string = '';
  editData: any = {};
  searchText: any = '';
  start: number = 0;
  end: number = 5;
  tableArray: any[] = [];
  tableData: any[] = [];
  formData: any = {};
  showEquipmentInput: boolean = false;
  submitted: boolean = false;
  showAddForm: boolean = true;
  showEditForm: boolean = false;
  allExpences: any[] = [];
  allEquipments: any[] = [];
  allEmployees: any[] = [];
  allShifts: any[] = [];

  addForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    expencetype: new FormControl('', [Validators.required]),
    eq_name: new FormControl(''),
    emp_name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    reciver: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    shift: new FormControl('', [Validators.required]),
  });

  editForm: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
    expencetype: new FormControl('', [Validators.required]),
    eq_name: new FormControl(''),
    emp_name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    reciver: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    shift: new FormControl('', [Validators.required]),
  });

  getAllExpences() {
    this.service.getAllExpenceType().subscribe({
      next: (res: any) => {
        this.allExpences = res;
      },
    });
  }

  getAllEquipments() {
    this.service.getAllEquipments().subscribe({
      next: (res: any) => {
        this.allEquipments = res;
      },
    });
  }

  getAllEmp() {
    this.service.getAllEmp().subscribe({
      next: (res: any) => {
        this.allEmployees = res;
      },
    });
  }

  getAllShifts() {
    this.service.getAllShifts().subscribe({
      next: (res: any) => {
        this.allShifts = res;
      },
    });
  }

  submit() {
    this.submitted = true;
    this.formData = {
      date: this.addForm.get('date')?.value,
      expencetype: this.addForm.get('expencetype')?.value,
      eq_name: this.addForm.get('eq_name')?.value,
      emp_name: this.addForm.get('emp_name')?.value,
      amount: this.addForm.get('amount')?.value,
      reciver: this.addForm.get('reciver')?.value,
      location: this.addForm.get('location')?.value,
      shift: this.addForm.get('shift')?.value,
    };
    if (this.addForm.valid) {
      this.service.addExpType(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.getAllExpTypes();
        },
      });
    } else {
      toast('please enter valid Details', false);
    }
  }

  setEquipment(event: any) {
    this.allExpences.forEach((e: any) => {
      if (event.target.value === e.expencetype) {
        this.showEquipmentInput = e.effectequipment;
      }
    });
  }

  getAllExpTypes() {
    this.service.getAllExpTypes().subscribe({
      next: (res: any) => {
        this.tableArray = res;
        this.tableData = this.tableArray.slice(this.start, this.end);
      },
    });
  }

  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }
  getEditData(data: object) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.editData = data;
    this.editForm.patchValue({
      date: this.editData.date,
      expencetype: this.editData.expencetype,
      eq_name: this.editData.eq_name,
      emp_name: this.editData.emp_name,
      amount: this.editData.amount,
      reciver: this.editData.reciver,
      location: this.editData.location,
      shift: this.editData.shift,
    });
  }

  updateExpType() {
    this.submitted = true;
    this.formData = {
      date: this.editForm.get('date')?.value,
      expencetype: this.editForm.get('expencetype')?.value,
      eq_name: this.editForm.get('eq_name')?.value,
      emp_name: this.editForm.get('emp_name')?.value,
      amount: this.editForm.get('amount')?.value,
      reciver: this.editForm.get('reciver')?.value,
      location: this.editForm.get('location')?.value,
      shift: this.editForm.get('shift')?.value,
      _id: this.editData._id,
    };
    if (this.editForm.valid) {
      this.service.updateExpType(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.getAllExpTypes();
        },
      });
    }
  }

  getDeleteId(id: string) {
    this.deleteId = id;
  }
  deleteExpType() {
    this.service.deleteExpType(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getAllExpTypes();
      },
    });
  }
}
