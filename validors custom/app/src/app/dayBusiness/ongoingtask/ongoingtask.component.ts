import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';
@Component({
  selector: 'app-ongoingtask',
  templateUrl: './ongoingtask.component.html',
  styleUrls: ['./ongoingtask.component.css'],
})
export class OngoingtaskComponent implements OnInit {
  getfirstRefillForm: any;
  ngOnInit(): void {
    this.getAllOngoingTasks();
    this.getMechSetupData();
  }
  constructor(private service: UserService, private _fb: FormBuilder) {}
  totalPrice: number = 0;
  hourlyRate: any;
  mechSetupData: any = [];
  formData: any = {};
  closingBal: number = 0;
  totalusedHours: number = 0;
  deleteId: string = '';
  taskData: any = {};
  submitted: boolean = false;
  ongoingTasks: any[] = [];
  refillData: any = {};
  searchText: string = '';
  getAllOngoingTasks() {
    this.service.getOngoingTasks().subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        this.ongoingTasks = res;
      },
    });
  }

  getMechSetupData() {
    this.service.getAllMechSetups().subscribe({
      next: (res: any) => {
        this.mechSetupData = res;
        console.log(this.mechSetupData);
      },
    });
  }

  getTaskData(id: any) {
    this.service.getTaskById(id).subscribe({
      next: (res: any) => {
        this.taskData = res;
        this.refillData = {
          openingbalance: this.taskData.openingbalance,
          startreading: this.taskData.startreading,
          taskid: this.taskData.taskid,
          _id: this.taskData._id,
        };
        this.addForm.patchValue({
          eq_num: this.taskData.eq_num,
          assignedemp: this.taskData.assignedemp,
          customer: this.taskData.customer,
          openingbalance: this.taskData.openingbalance,
          starttime: this.taskData.starttime,
          startreading: this.taskData.startreading,
          shift: this.taskData.shift,
          eq_status: this.taskData.eq_status,
        });
      },
    });
  }

  addForm: FormGroup = new FormGroup({
    eq_num: new FormControl('', [Validators.required]),
    assignedemp: new FormControl('', [Validators.required]),
    customer: new FormControl('', [Validators.required]),
    openingbalance: new FormControl('', [Validators.required]),
    starttime: new FormControl('', [Validators.required]),
    endtime: new FormControl('', [Validators.required]),
    startreading: new FormControl('', [Validators.required]),
    endreading: new FormControl('', [Validators.required]),
    shift: new FormControl('', [Validators.required]),
    remarks: new FormControl('', [Validators.required]),
    eq_status: new FormControl('', [Validators.required]),
    totalhoursused: new FormControl('',[Validators.required]),
    closingBal: new FormControl('',[Validators.required]),
  });
  // this._formBuilder.array(
  //   [0].map(() => this.newproductForm())
  // ),
  refillForm: FormGroup = this._fb.group({
    refills: this._fb.array([0].map(() => this.refillRows())),
  });

  get refillControls() {
    return (<FormArray>this.refillForm.get('refills')).controls;
  }

  get formArr() {
    return this.refillForm.get('refills') as FormArray;
  }

  refillRows() {
    return this._fb.group({
      taskid: [0, [Validators.required]],
      refillnum: [0, [Validators.required]],
      openingbalance: [80, [Validators.required]],
      closingbalance: [0, [Validators.required]],
      startreading: [, [Validators.required]],
      endreading: [, [Validators.required]],
    });
  }

  addnewRow() {
    this.formArr.push(this.refillRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  submit() {
    this.submitted = true;
    this.mechSetupData.forEach((e: any) => {
      if (this.addForm.get('eq_num')?.value === e.eq_num) {
        this.hourlyRate = e.hourlyrate;
      }
    });
    // console.log(this.hourlyRate);
    // console.log(this.addForm.get('totalhoursused')?.value);
    this.totalPrice =
      this.hourlyRate * this.addForm.get('totalhoursused')?.value;
    // console.log(this.totalPrice);
    this.formData = {
      eq_num: this.addForm.get('eq_num')?.value,
      assignedemp: this.addForm.get('assignedemp')?.value,
      customer: this.addForm.get('customer')?.value,
      openingbalance: this.addForm.get('openingbalance')?.value,
      starttime: this.addForm.get('starttime')?.value,
      endtime: this.addForm.get('endtime')?.value,
      startreading: this.addForm.get('startreading')?.value,
      endreading: this.addForm.get('endreading')?.value,
      shift: this.addForm.get('shift')?.value,
      remarks: this.addForm.get('remarks')?.value,
      eq_status: this.addForm.get('eq_status')?.value,
      totalhoursused: this.addForm.get('totalhoursused')?.value,
      closingBal: this.addForm.get('closingBal')?.value,
      _id: this.refillData._id,
      price: this.totalPrice,
    };
    if (this.addForm.valid) {
      this.service.updateTask(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.getAllOngoingTasks();
        },
      });
    } else {
      toast('please enter valid details', false);
    }
  }

  getDeleteId(id: string) {
    this.deleteId = id;
  }

  deleteTask() {
    this.service.deleteTask(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getAllOngoingTasks();
      },
    });
  }

  setRefill() {
    this.getfirstRefillForm = (
      this.refillForm.get('refills') as FormArray
    ).controls[0];
    const refillNum = this.getfirstRefillForm.get('refillnum')?.setValue(1);
    const startReading = this.getfirstRefillForm
      .get('startreading')
      ?.setValue(this.refillData.startreading);
    const openingBal = this.getfirstRefillForm
      .get('openingbalance')
      ?.setValue(this.refillData.openingbalance);
    const closingBal = this.getfirstRefillForm
      .get('closingbalance')
      ?.setValue(0);
  }

  submitRefill() {
    this.refillForm.value.refills.forEach((e: any) => {
      e.taskid = this.refillData.taskid;
      let usedHrs = e.endreading - e.startreading;
      this.totalusedHours = this.totalusedHours + usedHrs;
    });
    this.addForm.get('totalhoursused')?.setValue(this.totalusedHours);
    this.totalusedHours = 0;
    const lastRefill = this.refillForm.value.refills.slice(-1);
    this.closingBal = lastRefill[0].closingbalance;
    this.addForm.get('closingBal')?.setValue(this.closingBal);
    this.submitted = true;
    console.log(this.refillForm);
    this.refillForm.value.refills.forEach((e: any) => {
      this.formData = e;
      if (this.refillForm.valid) {
        this.service.addRefill(this.formData).subscribe({
          error: (err: any) => {
            toast(err.error.msg, false);
          },
          next: (res: any) => {
            toast(res.msg, true);
          },
        });
      } else {
        toast('please enter valid details', false);
      }
    });
  }
}
