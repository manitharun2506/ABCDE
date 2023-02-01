import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-idleequipments',
  templateUrl: './idleequipments.component.html',
  styleUrls: ['./idleequipments.component.css'],
})
export class IdleequipmentsComponent implements OnInit {
  ngOnInit(): void {
    this.getAllOngoingTasks();
    this.getAllMechSetups();
  }
  constructor(private service: UserService) {}
  start: number = 0;
  end: number = 5;
  tableArray: any[] = [];
  tableData: any[] = [];
  searchText: any = '';

  allOngoingTasks: any[] = [];
  allMechSetups: any[] = [];
  getAllOngoingTasks() {
    this.service.getOngoingTasks().subscribe({
      next: (res: any) => {
        this.allOngoingTasks = res;
      },
    });
  }

  getAllMechSetups() {
    this.service.getAllMechSetups().subscribe({
      next: (res: any) => {
        this.allMechSetups = res;

        this.filterEquipments();
      },
    });
  }

  filterEquipments() {
    this.allMechSetups.forEach((e: any) => {
      this.allOngoingTasks.forEach((j: any) => {
        if (e.eq_name !== j.eq_name) {
          this.tableArray.push(e);
        }
      });
    });
    this.tableData = this.tableArray.slice(this.start, this.end);
    console.log(this.tableData);
  }
}
