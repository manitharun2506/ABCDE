import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/custom-validators';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  ngOnInit(): void {
    this.getCategories();
    this.editForm.get('category')?.valueChanges.subscribe((value: any) => {
      if (this.editData.category === value) {
        this.editForm.get('category')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.category === value) {
            this.editForm.get('category')?.setErrors({ alreadyExist: true });
            this.duplicateedit = true;
          } else {
            this.duplicateedit = false;
          }
        });
      }
    });
  }
  isCategory: boolean = false;
  showAddForm: boolean = true;
  showEditForm: boolean = false;
  duplicateedit: boolean = false;
  editData: any;
  deleteId: any;
  tableArray: any = [];
  tableData: any = [];
  start: any = 0;
  end: any = 5;
  searchText: any = '';
  constructor(private service: UserService) {}
  submitted: boolean = false;
  formData: any;
  addForm: FormGroup = new FormGroup({
    category: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
      CustomValidator.nameValidator,
    ]),
  });
  editForm: FormGroup = new FormGroup({
    category: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
      CustomValidator.nameValidator,
    ]),
  });

  submit() {
    this.submitted = true;
    this.formData = {
      category: this.addForm.get('category')?.value,
    };
    if (this.addForm.valid) {
      this.service.addCategory(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.addForm.reset();
          this.getCategories();
        },
      });
    } else {
      toast('Please enter valid details', false);
    }
  }

  getCategories() {
    this.service.getAllCategory().subscribe({
      next: (res: any) => {
        this.tableArray = res;
        this.tableData = this.tableArray.slice(this.start, this.end);
      },
    });
  }

  getEditData(data: any) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.editData = data;
    this.editForm.patchValue({
      category: this.editData.category,
    });
  }
  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }
  updateCategory() {
    this.submitted = true;
    this.formData = {
      category: this.editForm.get('category')?.value,
      _id: this.editData._id,
    };
    if (this.editForm.valid && this.duplicateedit === false) {
      this.service.updateCategory(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.cancel();
          this.getCategories();
        },
      });
    } else {
      toast('Please enter valid details', false);
    }
  }

  getDeleteId(id: any) {
    this.deleteId = id;
  }

  deleteCategory() {
    this.service.deleteAllCategory(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);

        this.getCategories();
      },
    });
  }
  check(event: any) {
    this.tableArray.forEach((e: any) => {
      if (event.target.value === e.category) {
        this.isCategory = true;
      } else {
        this.isCategory = false;
      }
    });
  }
}
