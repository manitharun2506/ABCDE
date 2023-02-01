import { Component } from '@angular/core';
import { Router } from '@angular/router';
import toast from 'src/toast';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  constructor(private router: Router) {}
  logOut() {
    sessionStorage.removeItem('userdata');

    this.router.navigate(['/']);
    toast('account logged out Successfully', true);
  }

  hide() {
    const close = document.getElementById(
      'menu-Applications'
    ) as HTMLInputElement;

close.className=''

  }
}
