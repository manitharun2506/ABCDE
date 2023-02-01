import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import toast from 'src/toast';
import { CustomValidator } from '../custom-validators';
import { UserService } from '../user.service';
import { envi } from 'src/environments';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  eye: boolean = false;
  eye1: boolean = false;
  formData: any = {};
  userId: any = {};
  userData: any = {};
  changeName: boolean = false;
  showAccForm: boolean = false;
  submitted: boolean = false;
  nameForm: FormGroup = new FormGroup({
    name: new FormControl('',[
      Validators.required,
      CustomValidator.noWhitespaceValidator,
      CustomValidator.nameValidator,
    ]),
    photo: new FormControl(''),
  });
  selectedFile: any;
  currentFile: any;
  envirment: any;

  // checkValidation() {
  //   this.nameForm.get('name')?.valueChanges.subscribe((value: any) => {
  //     if (value != '' && value != null) {
  //       this.nameForm
  //         .get('name')
  //         ?.setValidators([
  //           Validators.required,
  //           CustomValidator.noWhitespaceValidator,
  //           CustomValidator.nameValidator,
  //         ]);
  //     } else {
  //       this.nameForm.get('name')?.clearValidators();
  //     }
  //     this.nameForm.get('name')?.updateValueAndValidity({ emitEvent: false });
  //   });
  // }

  selectFile(event: any) {
    this.selectedFile = event.target.files[0];
    this.currentFile = this.selectedFile;

    if (
      this.currentFile?.type != 'image/jpeg' &&
      this.currentFile?.type != 'image/JPEG' &&
      this.currentFile?.type != 'image/png' &&
      this.currentFile?.type != 'image/jpg' &&
      this.currentFile?.type != 'image/JPG' &&
      this.currentFile?.type != 'image/PNG'
    ) {
      // this.isFile = false;
      this.selectedFile = '';
      this.currentFile = '';
      this.nameForm.get('photo')?.setValue('');

      toast('Please select image file', false);
    } else {
      // this.isFile = true;
      this.selectedFile = event.target.files[0];
    }
  }

  updateName() {
    this.submitted = true;
    if (this.selectedFile === undefined || this.selectedFile === null) {
      this.formData = {
        name: this.nameForm.get('name')?.value,
        _id: this.userData._id,
      };
      if (this.nameForm.valid) {
        this.service.updateUser(this.formData).subscribe({
          error: (err: any) => {
            toast(err.error.msg, false);
          },
          next: (res: any) => {
            toast(res.msg, true);
            this.submitted = false;
            this.nameForm.reset();
            this.cancel2();
            this.getUserById();
          },
        });
      }
    } else {
      let formInfo = new FormData();
      formInfo.append('photo', this.selectedFile),
        formInfo.append('name', this.nameForm.get('name')?.value);
      this.service.editimg(formInfo, this.userData._id).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.nameForm.reset();
          this.cancel2();
          this.getUserById();
        },
      });
    }
  }

  cancel2() {
    this.changeName = false;
  }

  accForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    oldPassword: new FormControl('', [Validators.required]),
    newpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  togglePasswordVisibility() {
    this.eye = true ? !this.eye : this.eye;

    const passwordInput = document.getElementById(
      'password-input'
    ) as HTMLInputElement;
    passwordInput.type =
      passwordInput.type === 'password' ? 'text' : 'password';
  }
  togglePasswordVisibility2() {
    this.eye1 = true ? !this.eye1 : this.eye1;

    const passwordInput = document.getElementById(
      'password-input2'
    ) as HTMLInputElement;
    passwordInput.type =
      passwordInput.type === 'password' ? 'text' : 'password';
  }
  ngOnInit(): void {
    this.getUserById();
    // this.checkValidation();
    this.envirment = envi;
  }
  constructor(private service: UserService) {}

  getUserById() {
    this.userId = sessionStorage.getItem('userdata');
    this.service.getUserById(this.userId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        this.userData = res;
        console.log(this.userData);
      },
    });
  }
  edit() {
    this.changeName = true;
    this.nameForm.patchValue({
      name: this.userData.name,
    });
  }
  accSettings() {
    this.showAccForm = true;
  }
  cancel() {
    this.showAccForm = false;
  }

  submit() {
    this.submitted = true;
    if (
      this.accForm.get('username')?.value === this.userData.username &&
      this.accForm.get('oldPassword')?.value === this.userData.password &&
      this.accForm.valid
    ) {
      this.formData = {
        _id: this.userData._id,
        password: this.accForm.get('newpassword')?.value,
      };
      this.service.updateUser(this.formData).subscribe({
        error: (err: any) => {
          toast(err.error.msg, false);
        },
        next: (res: any) => {
          toast(res.msg, true);
          this.submitted = false;
          this.accForm.reset();
          this.cancel();
        },
      });
    } else {
      toast('Invalid Username or Password', false);
    }
  }
}
