import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-finishedtask',
  templateUrl: './finishedtask.component.html',
  styleUrls: ['./finishedtask.component.css'],
})
export class FinishedtaskComponent implements OnInit {
  ngOnInit(): void {
    this.getCompletedTasks();
  }
  constructor(private service: UserService) {}
  formData: any = {};
  taskData: any = {};
  searchText: string = '';
  completedTasks: any = [];
  refillData: any = [];
  getCompletedTasks() {
    this.service.getCompletedTasks().subscribe({
      next: (res: any) => {
        this.completedTasks = res;
      },
    });
  }
  getTaskData(id: string) {
    this.service.getTaskById(id).subscribe({
      next: (res: any) => {
        this.taskData = res;
        console.log(this.taskData);
      },
    });
  }

  getRefillDataByTaskId() {
    this.formData = {
      taskid: this.taskData.taskid,
    };
    this.service.getRefillsByTaskId(this.formData).subscribe({
      next: (res: any) => {
        this.refillData = res;
      },
    });
  }
}
