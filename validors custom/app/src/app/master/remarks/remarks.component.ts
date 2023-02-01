import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/custom-validators';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.css'],
})
export class RemarksComponent implements OnInit {
  ngOnInit(): void {
    this.getRemarks();

    this.editForm.get('remarks')?.valueChanges.subscribe((value: any) => {
      if (this.editData.remarks === value) {
        this.editForm.get('remarks')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.remarks === value) {
            this.editForm.get('remarks')?.setErrors({ alreadyExist: true });
            this.duplicateedit = true;
          } else {
            this.duplicateedit = false;
          }
        });
      }
    });
  }
  constructor(private service: UserService) {}
  isRemarks: boolean = false;
  duplicateedit: boolean = false;
  showAddForm: boolean = true;
  showEditForm: boolean = false;
  editData: any;
  deleteId: any;
  searchText: any = '';
  start: any = 0;
  end: any = 5;
  formData: any;
  tableArray: any = [];
  tableData: any = [];
  submitted: boolean = false;
  addForm: FormGroup = new FormGroup({
    remarks: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
      CustomValidator.nameValidator,
    ]),
  });

  editForm: FormGroup = new FormGroup({
    remarks: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
      CustomValidator.nameValidator,
    ]),
  });

  submit() {
    this.submitted = true;
    this.formData = {
      remarks: this.addForm.get('remarks')?.value,
    };
    if (this.addForm.valid) {
      this.service.addRemarks(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.addForm.reset();
          this.getRemarks();
        },
      });
    } else {
      toast('Please fill required details', false);
    }
  }

  getRemarks() {
    this.service.getAllRemarks().subscribe({
      next: (res: any) => {
        this.tableArray = res;
        this.tableData = this.tableArray.slice(this.start, this.end);
      },
    });
  }

  getDeleteId(id: any) {
    this.deleteId = id;
  }
  deleteRemark() {
    this.service.deleteRemarks(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getRemarks();
      },
    });
  }

  getEditData(data: any) {
    this.editData = data;
    this.showAddForm = false;
    this.showEditForm = true;
    this.editForm.patchValue({
      remarks: this.editData.remarks,
    });
  }
  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }
  updateRemark() {
    this.submitted = true;

    this.formData = {
      remarks: this.editForm.get('remarks')?.value,
      _id: this.editData._id,
    };
    if (this.editForm.valid && this.duplicateedit === false) {
      this.service.updateRemarks(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.cancel();
          this.getRemarks();
        },
      });
    } else {
      toast('Enter valid details (or) Remarks Already exists', false);
    }
  }

  check(event: any) {
    this.tableArray.forEach((e: any) => {
      if (event.target.value === e.remarks) {
        this.isRemarks = true;
      } else {
        this.isRemarks = false;
      }
    });
  }
}
