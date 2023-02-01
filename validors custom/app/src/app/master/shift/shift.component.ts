import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/custom-validators';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css'],
})
export class ShiftComponent implements OnInit {
  isShift: boolean = false;
  duplicateedit: boolean = false;
  showAddForm: boolean = true;
  showEditForm: boolean = false;
  editData: any;
  deleteId: any;
  tableArray: any = [];
  tableData: any = [];
  start: any = 0;
  end: any = 5;
  searchText: any = '';
  submitted: boolean = false;
  formData: any;
  addForm: FormGroup = new FormGroup({
    shift: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
      CustomValidator.nameValidator,
    ]),
  });
  editForm: FormGroup = new FormGroup({
    shift: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
      CustomValidator.nameValidator,
    ]),
  });

  constructor(private service: UserService) {}
  ngOnInit(): void {
    this.getAllShifts();

    this.editForm.get('shift')?.valueChanges.subscribe((value: any) => {
      if (this.editData.shift === value) {
        this.editForm.get('shift')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.shift === value) {
            this.editForm.get('shift')?.setErrors({ alreadyExist: true });
            this.duplicateedit = true;
          } else {
            this.duplicateedit = false;
          }
        });
      }
    });
  }

  submit() {
    this.submitted = true;
    this.formData = {
      shift: this.addForm.get('shift')?.value,
    };
    if (this.addForm.valid) {
      this.service.addShift(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          this.submitted = false;
          toast(res.msg, true);
          this.addForm.reset();
          this.getAllShifts();
        },
      });
    } else {
      toast('Please enter valid details', false);
    }
  }

  getAllShifts() {
    this.service.getAllShifts().subscribe({
      next: (res: any) => {
        this.tableArray = res;
        this.tableData = this.tableArray.slice(this.start, this.end);
      },
    });
  }

  getDeleteId(id: any) {
    this.deleteId = id;
  }
  deleteShift() {
    this.service.deleteShift(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getAllShifts();
      },
    });
  }
  getEditData(data: any) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.editData = data;
    this.editForm.patchValue({
      shift: this.editData.shift,
    });
  }
  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }

  updateShift() {
    this.submitted = true;
    this.formData = {
      shift: this.editForm.get('shift')?.value,
      _id: this.editData._id,
    };
    if (this.editForm.valid && this.duplicateedit === false) {
      this.service.updateShift(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.cancel();
          this.getAllShifts();
        },
      });
    } else {
      toast('Please enter valid details (or) Shift Already Exists', false);
    }
  }

  check(event: any) {
    this.tableArray.forEach((e: any) => {
      if (event.target.value === e.shift) {
        this.isShift = true;
      } else {
        this.isShift = false;
      }
    });
  }
}
