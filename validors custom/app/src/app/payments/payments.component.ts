import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import toast from 'src/toast';
import { UserService } from '../user.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  ngOnInit(): void {
    this.getAllPendingPayments();
    this.getAllShifts();
    this.getEmployees();
    this.getAllPayments();
  }
  viewBill: any = {};
  showEditForm: boolean = false;
  showAddForm: boolean = true;
  editData: any;
  deleteId: string = '';
  paymentsTable: any[] = [];
  allPayments: any[] = [];
  getfirstitemRow: any;
  taskIds: any[] = [];
  employeeData: any[] = [];
  start: number = 0;
  end: number = 5;
  submitted: boolean = false;
  shiftData: any[] = [];
  searchText: any = '';
  searchTable: any = '';
  allPendingPaymentsData: any[] = [];
  tableArray: any[] = [];
  constructor(private service: UserService, private _fb: FormBuilder) {}

  formData: any = {};
  editForm: FormGroup = new FormGroup({
    shift: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    customer: new FormControl('', [Validators.required]),
    taskid: new FormControl('', [Validators.required]),
    collectedby_emp: new FormControl('', [Validators.required]),
    paymentmode: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    totalamount: new FormControl('', [Validators.required]),
    paidamount: new FormControl('', [Validators.required]),
    balanceamount: new FormControl('', [Validators.required]),
  });

  addForm: FormGroup = new FormGroup({
    items: this._fb.array([0].map(() => this.itemRows())),
  });

  get itemControls() {
    return (<FormArray>this.addForm.get('items')).controls;
  }

  get formArr() {
    return this.addForm.get('items') as FormArray;
  }

  itemRows() {
    return this._fb.group({
      shift: ['', [Validators.required]],
      date: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      taskid: [0, [Validators.required]],
      collectedby_emp: ['', [Validators.required]],
      paymentmode: ['', [Validators.required]],
      location: [''],
      totalamount: [0, [Validators.required]],
      paidamount: [, [Validators.required]],
      balanceamount: [0, [Validators.required]],
    });
  }

  addnewRow() {
    this.formArr.push(this.itemRows());
  }
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  setPendingamt(event: any, index: number) {
    let value = Number(event.target.value);
    this.getfirstitemRow = (this.addForm.get('items') as FormArray).controls[
      index
    ];
    let totalAmt = this.getfirstitemRow.get('totalamount')?.value;
    let balanceAmt = totalAmt - value;
    this.getfirstitemRow.get('balanceamount')?.setValue(balanceAmt);
  }

  submit() {
    this.submitted = true;
    this.addForm.value.items.forEach((e: any) => {
      this.formData = e;
      let value = Number(this.formData.taskid);
      this.tableArray.forEach((j: any) => {
        if (value === j.taskid) {
          this.formData.location = j.location;
          this.formData.totalamount = j.price;
        }
      });

      if (this.addForm.valid) {
        if (this.formData.balanceamount === 0) {
          let obj = {
            taskid: this.formData.taskid,
            paymentstatus: 'Payed',
          };
          this.service.updateTaskPaymentStatus(obj).subscribe({
            error: (err: any) => {
              toast(err.error.msg, false);
            },
            next: (res: any) => {
              toast(res.msg, true);
            },
          });
        } else {
          let obj = {
            taskid: this.formData.taskid,
            balanceamount: this.formData.balanceamount,
          };
          this.service.updateTaskPaymentStatus(obj).subscribe({
            error: (err: any) => {
              toast(err.error.msg, false);
            },
            next: (res: any) => {
              toast(res.msg, true);
            },
          });
        }

        this.service.addPayment(this.formData).subscribe({
          error: (err: any) => {
            toast(err.error.msg, false);
          },
          next: (res: any) => {
            toast(res.msg, true);
            this.getAllPendingPayments();
            this.getAllPayments();
          },
        });
      } else {
        toast('please enter valid data', false);
      }
    });
  }

  setTaskid(event: any) {
    this.taskIds = [];
    this.tableArray.forEach((e: any) => {
      if (event.target.value === e.customer) {
        this.taskIds.push(e.taskid);
      }
    });
  }

  setBalanceAmount(event: any, index: number) {
    let value = Number(event.target.value);
    this.getfirstitemRow = (this.addForm.get('items') as FormArray).controls[
      index
    ];
    this.tableArray.forEach((e: any) => {
      if (value === e.taskid) {
        this.getfirstitemRow.get('totalamount')?.setValue(e.balanceamount);
        this.getfirstitemRow.get('balanceamount')?.setValue(e.balanceamount);
      }
    });
  }

  getAllPendingPayments() {
    this.service.getPendingPayments().subscribe({
      next: (res: any) => {
        this.tableArray = res;
        console.log(this.tableArray);
        this.allPendingPaymentsData = this.tableArray.slice(
          this.start,
          this.end
        );
      },
    });
  }

  getEmployees() {
    this.service.getAllEmp().subscribe({
      next: (res: any) => {
        this.employeeData = res;
      },
    });
  }

  getAllShifts() {
    this.service.getAllShifts().subscribe({
      next: (res: any) => {
        this.shiftData = res;
      },
    });
  }

  getAllPayments() {
    this.service.getAllPayments().subscribe({
      next: (res: any) => {
        this.allPayments = res;
        this.paymentsTable = this.allPayments.slice(this.start, this.end);
      },
    });
  }

  getDeleteId(id: string) {
    this.deleteId = id;
  }

  deletePayment() {
    console.log(this.deleteId);
    this.service.deletePayment(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getAllPayments();
      },
    });
  }

  getEditData(data: object) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.editData = data;
    this.editForm.patchValue({
      shift: this.editData.shift,
      date: this.editData.date,
      customer: this.editData.customer,
      taskid: this.editData.taskid,
      collectedby_emp: this.editData.collectedby_emp,
      paymentmode: this.editData.paymentmode,
      location: this.editData.location,
      totalamount: this.editData.totalamount,
      paidamount: this.editData.paidamount,
      balanceamount: this.editData.balanceamount,
    });
  }
  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }
  updatePayment() {
    this.submitted = true;
    this.formData = {
      shift: this.editForm.get('shift')?.value,
      date: this.editForm.get('date')?.value,
      customer: this.editForm.get('customer')?.value,
      taskid: this.editForm.get('taskid')?.value,
      collectedby_emp: this.editForm.get('collectedby_emp')?.value,
      paymentmode: this.editForm.get('paymentmode')?.value,
      location: this.editForm.get('location')?.value,
      totalamount: this.editForm.get('totalamount')?.value,
      paidamount: this.editForm.get('paidamount')?.value,
      balanceamount: this.editForm.get('balanceamount')?.value,
      _id: this.editData._id,
    };
    if (this.editForm.valid) {
      this.service.updatePayment(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.getAllPayments();
        },
      });
    } else {
      toast('please enter valid details', false);
    }
  }

  getBill(data: object) {
    this.viewBill = data;
  }
}
