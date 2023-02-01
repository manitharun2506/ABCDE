import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/custom-validators';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';

@Component({
  selector: 'app-assigntask',
  templateUrl: './assigntask.component.html',
  styleUrls: ['./assigntask.component.css'],
})
export class AssigntaskComponent implements OnInit {
  ngOnInit(): void {
    this.getAllShifts();
    this.getallSetUps();
    this.getAllEmp();
    this.getAllCustomers();
  }
  constructor(private service: UserService, private _fb: FormBuilder) {}
  id: string = '';
  formData: any = {};
  eq_num: string = '';
  openiningBalance: number = 0;
  shifts: any = [];
  equipmentsData: any = [];
  customersData: any = [];
  submitted: boolean = false;
  employeeData: any = [];
  getAllShifts() {
    this.service.getAllShifts().subscribe({
      next: (res: any) => {
        this.shifts = res;
      },
    });
  }

  getallSetUps() {
    this.service.getAllMechSetups().subscribe({
      next: (res: any) => {
        this.equipmentsData = res;
      },
    });
  }

  getAllEmp() {
    this.service.getAllEmp().subscribe({
      next: (res: any) => {
        this.employeeData = res;
      },
    });
  }

  getAllCustomers() {
    this.service.getCustomers().subscribe({
      next: (res: any) => {
        this.customersData = res;
        console.log(this.customersData);
      },
    });
  }

  addForm: FormGroup = this._fb.group({
    tasks: this._fb.array([0].map(() => this.taskRows())),
  });

  setEq_Details(event: any) {
    this.equipmentsData.forEach((e: any) => {
      if (e.eq_name === event.target.value) {
        this.id = e._id;
        this.eq_num = e.eq_num;
        this.openiningBalance = e.openingbalance;
      }
    });
  }

  get TasksControls() {
    return (<FormArray>this.addForm.get('tasks')).controls;
  }

  get formArr() {
    return this.addForm.get('tasks') as FormArray;
  }

  taskRows() {
    return this._fb.group({
      date: ['', [Validators.required]],
      starttime: ['', [Validators.required]],
      location: ['', [Validators.required]],
      shift: ['', [Validators.required]],
      eq_name: ['', [Validators.required]],
      eq_num: ['', [Validators.required]],
      openingbalance: ['', [Validators.required]],
      assignedemp: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      startreading: ['', [Validators.required]],
      // taskid: ['', [Validators.required]],
    });
  }

  addnewRow() {
    this.formArr.push(this.taskRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  updateOpening_bal(event: any) {
    this.formData = {
      openingbalance: event.target.value,
      _id: this.id,
    };
    this.service.updateMechineSetUp(this.formData).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
      },
    });
  }

  submit() {
    this.submitted = true;
    this.addForm.value.tasks.forEach((e: any) => {
      this.formData = e;
      if (this.addForm.valid) {
        this.service.assignTask(this.formData).subscribe({
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
