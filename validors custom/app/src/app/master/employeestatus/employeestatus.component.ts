import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/custom-validators';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';

@Component({
  selector: 'app-employeestatus',
  templateUrl: './employeestatus.component.html',
  styleUrls: ['./employeestatus.component.css'],
})
export class EmployeestatusComponent implements OnInit {
  ngOnInit(): void {
    this.getAllStatus();

    this.editForm
      .get('employeestatus')
      ?.valueChanges.subscribe((value: any) => {
        if (this.editData.employeestatus === value) {
          this.editForm.get('employeestatus')?.setErrors(null);
        } else {
          this.tableArray.forEach((item: any) => {
            if (item.employeestatus === value) {
              this.editForm
                .get('employeestatus')
                ?.setErrors({ alreadyExist: true });
              this.duplicateedit = true;
            } else {
              this.duplicateedit = false;
            }
          });
        }
      });
  }
  constructor(private service: UserService) {}
  isStatus: boolean = false;
  duplicateedit: boolean = false;
  showAddForm: boolean = true;
  showEditForm: boolean = false;
  editData: any;
  deleteId: any;
  tableArray: any = [];
  tableData: any = [];
  searchText: any = '';
  start: any = 0;
  end: any = 5;
  formData: any;
  submitted: boolean = false;
  addForm: FormGroup = new FormGroup({
    employeestatus: new FormControl('', [
      Validators.required,
      CustomValidator.nameValidator,
      CustomValidator.noWhitespaceValidator,
    ]),
  });

  editForm: FormGroup = new FormGroup({
    employeestatus: new FormControl('', [
      Validators.required,
      CustomValidator.nameValidator,
      CustomValidator.noWhitespaceValidator,
    ]),
  });
  submit() {
    this.submitted = true;
    this.formData = {
      employeestatus: this.addForm.get('employeestatus')?.value,
    };
    if (this.addForm.valid) {
      this.service.addEmpStatus(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.addForm.reset();
          this.getAllStatus();
        },
      });
    } else {
      toast('Please enter valid details', false);
    }
  }

  getAllStatus() {
    this.service.getAllStatus().subscribe({
      next: (res: any) => {
        this.tableArray = res;
        this.tableData = this.tableArray.slice(this.start, this.end);
      },
    });
  }

  getDeleteData(id: any) {
    this.deleteId = id;
  }

  deleteStatus() {
    this.service.deleteEmpStatus(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getAllStatus();
      },
    });
  }

  getEditData(data: any) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.editData = data;
    this.editForm.patchValue({
      employeestatus: this.editData.employeestatus,
    });
  }
  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }

  updateStatus() {
    this.submitted = true;
    this.formData = {
      employeestatus: this.editForm.get('employeestatus')?.value,
      _id: this.editData._id,
    };
    if (this.editForm.valid && this.duplicateedit === false) {
      this.service.updateEmpStatus(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.cancel();
          this.getAllStatus();
        },
      });
    } else {
      toast('Please enter valid details (or) Emp Status Already Exists', false);
    }
  }

  check(event: any) {
    this.tableArray.forEach((e: any) => {
      if (event.target.value === e.employeestatus) {
        this.isStatus = true;
      } else {
        this.isStatus = false;
      }
    });
  }
}
