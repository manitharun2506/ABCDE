import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/custom-validators';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css'],
})
export class DesignationComponent implements OnInit {
  ngOnInit(): void {
    this.getDesignation();

    this.editForm.get('designation')?.valueChanges.subscribe((value: any) => {
      if (this.editData.designation === value) {
        this.editForm.get('designation')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.designation === value) {
            this.editForm.get('designation')?.setErrors({ alreadyExist: true });
            this.duplicateedit = true;
          } else {
            this.duplicateedit = false;
          }
        });
      }
    });
  }

  constructor(private service: UserService) {}
  isDesignation: boolean = false;
  duplicateedit: boolean = false;
  editData: any;
  showAddForm: boolean = true;
  showEditForm: boolean = false;
  deleteId: any;
  searchText: any = '';
  tableArray: any = [];
  tableData: any = [];
  start: any = 0;
  end: any = 5;
  formData: any;
  submitted: boolean = false;
  addForm: FormGroup = new FormGroup({
    designation: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
      CustomValidator.nameValidator,
    ]),
  });
  editForm: FormGroup = new FormGroup({
    designation: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
      CustomValidator.nameValidator,
    ]),
  });

  submit() {
    this.submitted = true;
    this.formData = {
      designation: this.addForm.get('designation')?.value,
    };
    if (this.addForm.valid) {
      this.service.addDesignation(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.addForm.reset();
          this.getDesignation();
        },
      });
    } else {
      toast('Please fill details', false);
    }
  }

  getDesignation() {
    this.service.getAllDesignations().subscribe({
      next: (res: any) => {
        this.tableArray = res;
        this.tableData = this.tableArray.slice(this.start, this.end);
      },
    });
  }
  getDeleteId(id: any) {
    this.deleteId = id;
  }

  deleteDesignation() {
    this.service.deleteDesignation(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getDesignation();
      },
    });
  }

  getEditData(data: any) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.editData = data;
    this.editForm.patchValue({
      designation: this.editData.designation,
    });
  }

  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }

  updateDesignation() {
    this.submitted = true;
    this.formData = {
      designation: this.editForm.get('designation')?.value,
      _id: this.editData._id,
    };
    if (this.editForm.valid && this.duplicateedit === false) {
      this.service.updateDesignaton(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.cancel();
          this.getDesignation();
        },
      });
    } else {
      toast('Please fill required fields', false);
    }
  }

  check(event: any) {
    this.tableArray.forEach((e: any) => {
      if (event.target.value === e.designation) {
        this.isDesignation = true;
      } else {
        this.isDesignation = false;
      }
    });
  }
}
