import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';

@Component({
  selector: 'app-mechinesetup',
  templateUrl: './mechinesetup.component.html',
  styleUrls: ['./mechinesetup.component.css'],
})
export class MechinesetupComponent implements OnInit {
  ngOnInit(): void {
    this.getAllEquipments();
    this.getallSetUps();
    this.editForm.get('eq_num')?.valueChanges.subscribe((value: any) => {
      if (this.editData.eq_num === value) {
        this.editForm.get('eq_num')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.eq_num === value) {
            this.editForm.get('eq_num')?.setErrors({ alreadyExist: true });
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
  deleteId: string = '';
  changeRate: any = {};
  tableArray: any = [];
  tableData: any = [];
  start: any = 0;
  end: any = 5;
  searchText: string = '';
  formData: any = {};
  submitted: boolean = false;
  equipmentNum: string = '';
  equipmentDetails: any = [];
  addForm: FormGroup = new FormGroup({
    eq_name: new FormControl('', [Validators.required]),
    eq_num: new FormControl('', [Validators.required]),
    openingbalance: new FormControl('', [Validators.required]),
    hourlyrate: new FormControl('', [Validators.required]),
  });
  editForm: FormGroup = new FormGroup({
    eq_name: new FormControl('', [Validators.required]),
    eq_num: new FormControl('', [Validators.required]),
    openingbalance: new FormControl('', [Validators.required]),
    hourlyrate: new FormControl('', [Validators.required]),
  });
  constructor(private service: UserService) {}

  getAllEquipments() {
    this.service.getAllEquipments().subscribe({
      next: (res: any) => {
        this.equipmentDetails = res;
        console.log(this.equipmentDetails);
      },
    });
  }

  getEquipmentCode(event: any) {
    this.equipmentDetails.forEach((e: any) => {
      if (e.eq_name === event.target.value) {
        this.equipmentNum = e.code;
      }
    });
    this.addForm.patchValue({
      eq_num: this.equipmentNum,
    });
    this.editForm.patchValue({
      eq_num: this.equipmentNum,
    });
  }
  submit() {
    this.submitted = true;
    this.formData = {
      eq_name: this.addForm.get('eq_name')?.value,
      eq_num: this.addForm.get('eq_num')?.value,
      openingbalance: this.addForm.get('openingbalance')?.value,
      hourlyrate: this.addForm.get('hourlyrate')?.value,
    };
    if (this.addForm.valid) {
      this.service.addSetupMech(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.getallSetUps();
          this.addForm.reset();
        },
      });
    } else {
      toast('please enter valid details', false);
    }
  }

  getallSetUps() {
    this.service.getAllMechSetups().subscribe({
      next: (res: any) => {
        this.tableArray = res;
        this.tableData = this.tableArray.slice(this.start, this.end);
      },
    });
  }

  hourlyRate(event: any, id: any) {
    this.changeRate = {
      hourlyrate: event.target.value,
      _id: id,
    };
  }
  updateRate() {
    if (Object.entries(this.changeRate).length === 2) {
      this.service.updateMechineSetUp(this.changeRate).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.getallSetUps();
        },
      });
    } else {
      toast('please enter amount', false);
    }
  }

  getDeleteId(id: string) {
    this.deleteId = id;
  }

  deleteSetup() {
    this.service.deleteMechSetup(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getallSetUps();
      },
    });
  }

  getEditData(data: any) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.editData = data;
    this.editForm.patchValue({
      eq_name: this.editData.eq_name,
      eq_num: this.editData.eq_num,
      openingbalance: this.editData.openingbalance,
      hourlyrate: this.editData.hourlyrate,
    });
  }

  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }

  updateSetup() {
    this.submitted = true;
    this.formData = {
      eq_name: this.editForm.get('eq_name')?.value,
      eq_num: this.editForm.get('eq_num')?.value,
      openingbalance: this.editForm.get('openingbalance')?.value,
      hourlyrate: this.editForm.get('hourlyrate')?.value,
      _id: this.editData._id,
    };
    if (this.editForm.valid && this.duplicateedit === false) {
      this.service.updateMechineSetUp(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.getallSetUps();
          this.editForm.reset();
        },
      });
    } else {
      toast(
        'please enter valid details or equipment setup done already',
        false
      );
    }
  }
}
