import { Component, OnInit } from '@angular/core';
import { Loader, LoaderOptions } from 'google-maps';
import { UserService } from '../user.service';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;
  allCustomers: any[] = [];
  allEquipments: any[] = [];
  allSupliers: any[] = [];
  allPartners: any[] = [];
  allEmps: any[] = [];
  allUsers: any[] = [];
  totalAdmins: any[] = [];
  totalRecoveryAmt: number = 0;
  totalExp: number = 0;
  totalRecivedAmt: number = 0;
  totalPendingAmt: number = 0;
  allPendingAmts: any[] = [];
  allPayments: any[] = [];
  equipmentExpences: any[] = [];
  allExpences: any[] = [];
  searchText: any = '';
  allOngoingTasks: any[] = [];
  tableData: any[] = [];
  tableArray: any[] = [];
  start: number = 0;
  end: number = 5;
  finishedTasks: any[] = [];
  ngOnInit(): void {
    this.getAllExpences();
    this.mapInitializer();
    this.addMarkers();
    this.getAllOngoingTasks();
    this.getAllMechineSetUps();
    this.getAllPayments();
    this.getAllPendingAmt();
    this.getAllFinishedTasks();
    this.getAllUsers();
    this.getAllEmps();
    this.getAllPartners();
    this.getAllSuppliers();
    this.getAllEquipments();
    this.getAllCustomers()
  }
  constructor(private service: UserService) {
    this.chartOptions = {
      // do dynamic series with values
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: 'pie',
      },
      // do dynamic labels with names
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  map: any;
  lat = 21.0;
  lng = 78.0;
  markers: any[] = [];
  coOrdinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coOrdinates,
    zoom: 8,
  };

  addMarkers() {
    const a = [
      [1, 2],
      [29, 3],
      [76, 3],
      [33, 3],
    ];
    a.forEach((val: any) => {
      const ob = {
        position: new google.maps.LatLng(val[0], val[1]),
        map: this.map,
        title: 'India',
      };
      this.markers.push(ob);
    });
    this.markers.forEach((mapElement) => {
      const marker = new google.maps.Marker({
        ...mapElement,
      });
      const infoWindow = new google.maps.InfoWindow({
        content: 'hai',
      });
      marker.addListener('click', () => {
        infoWindow.open(marker.getMap() as any, marker);
      });
      marker.setMap(this.map);
    });
  }

  mapInitializer() {
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      this.mapOptions
    );
  }

  getAllOngoingTasks() {
    this.service.getOngoingTasks().subscribe({
      next: (res: any) => {
        this.allOngoingTasks = res;
      },
    });
  }
  getAllMechineSetUps() {
    this.service.getAllMechSetups().subscribe({
      next: (res: any) => {
        this.tableArray = res;
        this.tableData = this.tableArray.slice(this.start, this.end);
      },
    });
  }

  getAllExpences() {
    this.service.getAllExpTypes().subscribe({
      next: (res: any) => {
        this.allExpences = res;
        this.allExpences.forEach((e: any) => {
          this.totalExp = this.totalExp + e.amount;
        });
      },
    });
  }

  getAllPayments() {
    this.service.getAllPayments().subscribe({
      next: (res: any) => {
        this.allPayments = res;
        this.allPayments.forEach((e: any) => {
          this.totalRecivedAmt = this.totalRecivedAmt + e.paidamount;
        });
      },
    });
  }

  getAllPendingAmt() {
    this.service.getPendingPayments().subscribe({
      next: (res: any) => {
        this.allPendingAmts = res;
        this.allPendingAmts.forEach((e: any) => {
          this.totalPendingAmt = this.totalPendingAmt + e.balanceamount;
          this.totalRecoveryAmt = this.totalRecoveryAmt + e.price;
        });
      },
    });
  }

  getAllFinishedTasks() {
    this.service.getCompletedTasks().subscribe({
      next: (res: any) => {
        this.finishedTasks = res;
      },
    });
  }

  getAllUsers() {
    this.service.getAllusers().subscribe({
      next: (res: any) => {
        this.allUsers = res;
        this.allUsers.forEach((e: any) => {
          if (e.user_role === 'super admin') {
            this.totalAdmins.push(e);
          }
        });
      },
    });
  }

  getAllEmps() {
    this.service.getAllEmp().subscribe({
      next: (res: any) => {
        this.allEmps = res;
      },
    });
  }

  getAllPartners() {
    this.service.getPartner().subscribe({
      next: (res: any) => {
        this.allPartners = res;
      },
    });
  }

  getAllSuppliers() {
    this.service.getAllSuppliers().subscribe({
      next: (res: any) => {
        this.allSupliers = res;
      },
    });
  }

  getAllEquipments() {
    this.service.getAllEquipments().subscribe({
      next: (res: any) => {
        this.allEquipments = res;
      },
    });
  }

  getAllCustomers() {
    this.service.getCustomers().subscribe({
      next: (res: any) => {
        this.allCustomers = res;
      },
    });
  }
}
