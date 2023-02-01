import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import toast from 'src/toast';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userId: any = {};
  userData: any = {};
  constructor(private router: Router, private service: UserService) {}
  ngOnInit(): void {
    this.getUserById();
  }

  getUserById() {
    this.userId = sessionStorage.getItem('userdata');
    this.service.getUserById(this.userId).subscribe({
      error: (err: any) => {
        toast(err.error.msg, false);
      },
      next: (res: any) => {
        this.userData = res;
      },
    });
  }

  logOut() {
    sessionStorage.removeItem('userdata');

    this.router.navigate(['/']);
    toast('account logged out Successfully', true);
  }
}
