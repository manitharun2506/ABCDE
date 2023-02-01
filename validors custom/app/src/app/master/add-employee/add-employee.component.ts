import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { envi } from 'src/environments';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';
import { CustomValidator } from 'src/app/custom-validators';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  envirment: any = {};
  ngOnInit(): void {
    this.getDesignation();
    this.getAllStatus();
    this.getAllEmp();
    this.envirment = envi;
    this.editForm.get('emp_name')?.valueChanges.subscribe((value: any) => {
      if (this.editData.emp_name === value) {
        this.editForm.get('emp_name')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.emp_name === value) {
            this.editForm.get('emp_name')?.setErrors({ alreadyExist: true });
            this.duplicateedit = true;
          } else {
            this.duplicateedit = false;
          }
        });
      }
    });

    this.editForm.get('emp_id')?.valueChanges.subscribe((value: any) => {
      if (this.editData.emp_id === value) {
        this.editForm.get('emp_id')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.emp_id === value) {
            this.editForm.get('emp_id')?.setErrors({ alreadyExist: true });
            this.duplicateedit = true;
          } else {
            this.duplicateedit = false;
          }
        });
      }
    });
    this.editForm.get('gov_id')?.valueChanges.subscribe((value: any) => {
      if (this.editData.gov_id === value) {
        this.editForm.get('gov_id')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.gov_id === value) {
            this.editForm.get('gov_id')?.setErrors({ alreadyExist: true });
            this.duplicateedit = true;
          } else {
            this.duplicateedit = false;
          }
        });
      }
    });
    this.editForm.get('ph_no')?.valueChanges.subscribe((value: any) => {
      value = Number(value);
      // console.log(value);
      if (this.editData.ph_no === value) {
        this.editForm.get('ph_no')?.setErrors(null);
      } else {
        this.tableArray.forEach((item: any) => {
          if (item.ph_no === value) {
            this.editForm.get('ph_no')?.setErrors({ alreadyExists: true });
            this.duplicateedit = true;
          } else {
            this.duplicateedit = false;
          }
        });
      }
    });
  }
  imgInfo: string = '';
  duplicateedit: boolean = false;
  showAddForm: boolean = true;
  showEditForm: boolean = false;
  editData: any;
  deleteId: any;
  searchText: any = '';
  tableArray: any = [];
  tableData: any = [];
  start: any = 0;
  end: any = 5;
  selectedFile: any;
  designation: any = [];
  empStatus: any = [];
  submitted: boolean = false;
  addForm: FormGroup = new FormGroup({
    emp_name: new FormControl('', [
      Validators.required,
      CustomValidator.nameValidator,
      CustomValidator.noWhitespaceValidator,
    ]),
    emp_id: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
    ]),
    designation: new FormControl('', [Validators.required]),
    ph_no: new FormControl('', [
      Validators.required,
      CustomValidator.phoneNumberValidator,
    ]),
    alt_ph_no: new FormControl(''),
    address: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
    ]),
    gov_id: new FormControl('', [
      Validators.required,
      CustomValidator.aadharValidator,
    ]),
    photo: new FormControl('', [Validators.required]),
    emp_status: new FormControl('', [Validators.required]),
    joiningdate: new FormControl('', [Validators.required]),
    salary: new FormControl('', [
      Validators.required,
      CustomValidator.negativeNumberValidator,
    ]),
    accounttitle: new FormControl(''),
    bankname: new FormControl(''),
    bnk_branch_name: new FormControl(''),
    bnk_acc_no: new FormControl(0),
    ifsccode: new FormControl(''),
    leave_type: new FormControl(''),
    no_of_leaves: new FormControl(0),
    taxname: new FormControl(''),
    taxpercentage: new FormControl(0),
  });

  editForm: FormGroup = new FormGroup({
    emp_name: new FormControl('', [
      Validators.required,
      CustomValidator.nameValidator,
      CustomValidator.noWhitespaceValidator,
    ]),
    emp_id: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
    ]),
    designation: new FormControl('', [Validators.required]),
    ph_no: new FormControl('', [
      Validators.required,
      CustomValidator.phoneNumberValidator,
    ]),
    alt_ph_no: new FormControl(''),
    address: new FormControl('', [
      Validators.required,
      CustomValidator.noWhitespaceValidator,
    ]),
    gov_id: new FormControl('', [
      Validators.required,
      CustomValidator.aadharValidator,
    ]),
    photo: new FormControl('', [Validators.required]),
    emp_status: new FormControl('', [Validators.required]),
    joiningdate: new FormControl('', [Validators.required]),
    salary: new FormControl('', [
      Validators.required,
      CustomValidator.negativeNumberValidator,
    ]),
    accounttitle: new FormControl(''),
    bankname: new FormControl(''),
    bnk_branch_name: new FormControl(''),
    bnk_acc_no: new FormControl(0),
    ifsccode: new FormControl(''),
    leave_type: new FormControl(''),
    no_of_leaves: new FormControl(0),
    taxname: new FormControl(''),
    taxpercentage: new FormControl(0),
  });

  constructor(private service: UserService) {}
  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }
  submit() {
    this.submitted = true;
    let formData = new FormData();
    formData.append('photo', this.selectedFile);
    formData.append('emp_name', this.addForm.get('emp_name')?.value);
    formData.append('emp_id', this.addForm.get('emp_id')?.value);
    formData.append('designation', this.addForm.get('designation')?.value);
    formData.append('ph_no', this.addForm.get('ph_no')?.value);
    formData.append('alt_ph_no', this.addForm.get('alt_ph_no')?.value);
    formData.append('address', this.addForm.get('address')?.value);
    formData.append('gov_id', this.addForm.get('gov_id')?.value);
    formData.append('emp_status', this.addForm.get('emp_status')?.value);
    formData.append('joiningdate', this.addForm.get('joiningdate')?.value);
    formData.append('salary', this.addForm.get('salary')?.value);
    formData.append('accounttitle', this.addForm.get('accounttitle')?.value);
    formData.append('bankname', this.addForm.get('bankname')?.value);
    formData.append(
      'bnk_branch_name',
      this.addForm.get('bnk_branch_name')?.value
    );
    formData.append('bnk_acc_no', this.addForm.get('bnk_acc_no')?.value);
    formData.append('ifsccode', this.addForm.get('ifsccode')?.value);
    formData.append('leave_type', this.addForm.get('leave_type')?.value);
    formData.append('no_of_leaves', this.addForm.get('no_of_leaves')?.value);
    formData.append('taxname', this.addForm.get('taxname')?.value);
    formData.append('taxpercentage', this.addForm.get('taxpercentage')?.value);
    if (this.addForm.valid) {
      this.service.addEmp(formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.getAllEmp();
          this.addForm.reset();
        },
      });
    }
  }

  getAllEmp() {
    this.service.getAllEmp().subscribe({
      next: (res: any) => {
        this.tableArray = res;
        this.tableData = this.tableArray.slice(this.start, this.end);
      },
    });
  }

  getDesignation() {
    this.service.getAllDesignations().subscribe({
      next: (res: any) => {
        this.designation = res;
      },
    });
  }

  getAllStatus() {
    this.service.getAllStatus().subscribe({
      next: (res: any) => {
        this.empStatus = res;
      },
    });
  }

  getDeleteId(id: any) {
    this.deleteId = id;
  }
  deleteEmployee() {
    this.service.deleteEmp(this.deleteId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        toast(res.msg, true);
        this.getAllEmp();
      },
    });
  }

  getEditData(data: any) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.editData = data;
    this.imgInfo = this.editData.photo;
    this.editForm.patchValue({
      emp_name: this.editData.emp_name,
      emp_id: this.editData.emp_id,
      designation: this.editData.designation,
      ph_no: this.editData.ph_no,
      alt_ph_no: this.editData.alt_ph_no,
      address: this.editData.address,
      gov_id: this.editData.gov_id,

      emp_status: this.editData.emp_status,
      joiningdate: this.editData.joiningdate,
      salary: this.editData.salary,
      accounttitle: this.editData.accounttitle,
      bankname: this.editData.bankname,
      bnk_branch_name: this.editData.bnk_branch_name,
      bnk_acc_no: this.editData.bnk_acc_no,
      ifsccode: this.editData.ifsccode,
      leave_type: this.editData.leave_type,
      no_of_leaves: this.editData.no_of_leaves,
      taxname: this.editData.taxname,
      taxpercentage: this.editData.taxpercentage,
    });
  }
  cancel() {
    this.showAddForm = true;
    this.showEditForm = false;
  }
  updateEmployee() {
    this.submitted = true;
    let editformData = new FormData();
    editformData.append('photo', this.selectedFile);
    editformData.append('emp_name', this.editForm.get('emp_name')?.value);
    editformData.append('emp_id', this.editForm.get('emp_id')?.value);
    editformData.append('designation', this.editForm.get('designation')?.value);
    editformData.append('ph_no', this.editForm.get('ph_no')?.value);
    editformData.append('alt_ph_no', this.editForm.get('alt_ph_no')?.value);
    editformData.append('address', this.editForm.get('address')?.value);
    editformData.append('gov_id', this.editForm.get('gov_id')?.value);
    editformData.append('emp_status', this.editForm.get('emp_status')?.value);
    editformData.append('joiningdate', this.editForm.get('joiningdate')?.value);
    editformData.append('salary', this.editForm.get('salary')?.value);
    editformData.append(
      'accounttitle',
      this.editForm.get('accounttitle')?.value
    );
    editformData.append('bankname', this.editForm.get('bankname')?.value);
    editformData.append(
      'bnk_branch_name',
      this.editForm.get('bnk_branch_name')?.value
    );
    console.log(this.editForm.get('bnk_acc_no')?.value);
    editformData.append('bnk_acc_no', this.editForm.get('bnk_acc_no')?.value);
    editformData.append('ifsccode', this.editForm.get('ifsccode')?.value);
    editformData.append('leave_type', this.editForm.get('leave_type')?.value);
    editformData.append(
      'no_of_leaves',
      this.editForm.get('no_of_leaves')?.value
    );
    editformData.append('taxname', this.editForm.get('taxname')?.value);
    editformData.append(
      'taxpercentage',
      this.editForm.get('taxpercentage')?.value
    );
    editformData.append('_id', this.editData._id);
    console.log(this.editForm);
    if (this.editForm.valid && this.duplicateedit === false) {
      this.service.updateEmp(editformData, this.editData._id).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.cancel();
          this.getAllEmp();
        },
      });
    } else {
      toast(
        'input fields should be filled (or) entered Data already exists',
        false
      );
    }
  }
}
