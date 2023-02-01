import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import toast from 'src/toast';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formData: any = {};
  eye: boolean = false;
  ngOnInit(): void {}
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private service: UserService, private router: Router) {}
  togglePasswordVisibility() {
    this.eye = true ? !this.eye : this.eye;

    const passwordInput = document.getElementById(
      'password-input'
    ) as HTMLInputElement;
    passwordInput.type =
      passwordInput.type === 'password' ? 'text' : 'password';
    if (this.eye === true) {
      setTimeout(this.rotator, 1000);
    }
  }

  rotator = () => {
    this.togglePasswordVisibility();
  };
  submit(): void {
    this.formData = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.service.userLogin(this.formData).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        console.log(res);
        sessionStorage.setItem('userdata', res);
        console.log(sessionStorage);
        toast('login successfully', true);
        this.router.navigate(['/dashboard']);
      },
    });
  }
}
