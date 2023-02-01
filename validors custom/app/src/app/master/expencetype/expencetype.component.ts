import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/custom-validators';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';

@Component({
  selector: 'app-expencetype',
  templateUrl: './expencetype.component.html',
  styleUrls: ['./expencetype.component.css'],
})
export class ExpencetypeComponent implements OnInit {
  ngOnInit(): void {
    this.getAllExpenceTypes();
    this.editForm.get('expencetype')?.valueChanges.subscribe((value: any) => {
      if (this.editData.expencetype === value) {
        this.editForm.get('expencetype')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.expencetype === value) {
            this.editForm.get('expencetype')?.setErrors({ alreadyExist: true });
            this.duplicateedit = true;
          } else {
            this.duplicateedit = false;
          }
        });
      }
    });
  }
  isexpence: boolean = false;
  duplicateedit: boolean = false;
  showAddForm: boolean = true;
  showEditForm: boolean = false;
  editData: any;
  deleteId: any;
  submitted: boolean = false;
  start: any = 0;
  end: any = 5;
  searchText: any = '';
  tableArray: any = [];
  tableData: any = [];
  constructor(private service: UserService) {}
  formData: any;
  addForm: FormGroup = new FormGroup({
    expencetype: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
      CustomValidator.nameValidator,
    ]),
    effectequipment: new FormControl('false', [Validators.required]),
  });

  editForm: FormGroup = new FormGroup({
    expencetype: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
      CustomValidator.nameValidator,
    ]),
    effectequipment: new FormControl('false', [Validators.required]),
  });
  submit() {
    this.submitted = true;
    this.formData = {
      expencetype: this.addForm.get('expencetype')?.value,
      effectequipment: this.addForm.get('effectequipment')?.value,
    };
    if (this.addForm.valid) {
      this.service.addExpencetype(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.addForm.reset();
          this.getAllExpenceTypes();
        },
      });
    } else {
      toast('please fill required details', false);
    }
  }

  getAllExpenceTypes() {
    this.service.getAllExpenceType().subscribe({
      next: (res: any) => {
        this.tableArray = res;
        this.tableData = this.tableArray.slice(this.start, this.end);
      },
    });
  }

  getDeleteId(id: any) {
    this.deleteId = id;
  }

  deleteExpencetype() {
    this.service.deleteExpenceType(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getAllExpenceTypes();
      },
    });
  }

  getEditData(data: any) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.editData = data;
    this.editForm.patchValue({
      expencetype: this.editData.expencetype,
      effectequipment: this.editData.effectequipment,
    });
  }

  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }

  updateExpenceType() {
    this.submitted = true;
    this.formData = {
      expencetype: this.editForm.get('expencetype')?.value,
      effectequipment: this.editForm.get('effectequipment')?.value,
      _id: this.editData._id,
    };
    if (this.editForm.valid && this.duplicateedit === false) {
      this.service.updateExpenceType(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.cancel();
          this.getAllExpenceTypes();
        },
      });
    } else {
      toast('please fill required details', false);
    }
  }

  check(event: any) {
    this.tableArray.forEach((e: any) => {
      if (event.target.value === e.expencetype) {
        this.isexpence = true;
      } else {
        this.isexpence = false;
      }
    });
  }
}
