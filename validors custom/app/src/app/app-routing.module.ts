import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssigntaskComponent } from './dayBusiness/assigntask/assigntask.component';
import { FinishedtaskComponent } from './dayBusiness/finishedtask/finishedtask.component';
import { MechinesetupComponent } from './dayBusiness/mechinesetup/mechinesetup.component';
import { OngoingtaskComponent } from './dayBusiness/ongoingtask/ongoingtask.component';
import { ExpencesComponent } from './expences/expences.component';
import { IdleequipmentsComponent } from './idleequipments/idleequipments.component';
import { EquipmentsComponent } from './inventory/equipments/equipments.component';
import { SparepartsComponent } from './inventory/spareparts/spareparts.component';

import { LoginComponent } from './login/login.component';
import { AddEmployeeComponent } from './master/add-employee/add-employee.component';
import { CategoryComponent } from './master/category/category.component';
import { CustomersComponent } from './master/customers/customers.component';
import { DesignationComponent } from './master/designation/designation.component';
import { EmployeestatusComponent } from './master/employeestatus/employeestatus.component';
import { ExpencetypeComponent } from './master/expencetype/expencetype.component';
import { LocationsComponent } from './master/locations/locations.component';
import { PartnersComponent } from './master/partners/partners.component';
import { RemarksComponent } from './master/remarks/remarks.component';
import { ShiftComponent } from './master/shift/shift.component';
import { SupplierComponent } from './master/supplier/supplier.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'partners',
    component: PartnersComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'suppliers',
    component: SupplierComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'locations',
    component: LocationsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'expencetype',
    component: ExpencetypeComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'remarks',
    component: RemarksComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'designation',
    component: DesignationComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'empstatus',
    component: EmployeestatusComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'shift',
    component: ShiftComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'addemp',
    component: AddEmployeeComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'equipments',
    component: EquipmentsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'spareparts',
    component: SparepartsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'mechsetup',
    component: MechinesetupComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'assigntask',
    component: AssigntaskComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'ongoingtask',
    component: OngoingtaskComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'finishedtask',
    component: FinishedtaskComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'payments',
    component: PaymentsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'expences',
    component: ExpencesComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'ideleq',
    component: IdleequipmentsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticationGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
