import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SupplierComponent } from './master/supplier/supplier.component';
import { PartnersComponent } from './master/partners/partners.component';
import { CustomersComponent } from './master/customers/customers.component';
import { LocationsComponent } from './master/locations/locations.component';
import { SearchPipe } from './search.pipe';
import { ExpencetypeComponent } from './master/expencetype/expencetype.component';
import { RemarksComponent } from './master/remarks/remarks.component';
import { CategoryComponent } from './master/category/category.component';
import { DesignationComponent } from './master/designation/designation.component';
import { EmployeestatusComponent } from './master/employeestatus/employeestatus.component';
import { ShiftComponent } from './master/shift/shift.component';
import { AddEmployeeComponent } from './master/add-employee/add-employee.component';
import { EquipmentsComponent } from './inventory/equipments/equipments.component';
import { SparepartsComponent } from './inventory/spareparts/spareparts.component';
import { MechinesetupComponent } from './dayBusiness/mechinesetup/mechinesetup.component';
import { AssigntaskComponent } from './dayBusiness/assigntask/assigntask.component';
import { OngoingtaskComponent } from './dayBusiness/ongoingtask/ongoingtask.component';
import { FinishedtaskComponent } from './dayBusiness/finishedtask/finishedtask.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentsComponent } from './payments/payments.component';
import { ExpencesComponent } from './expences/expences.component';
import { IdleequipmentsComponent } from './idleequipments/idleequipments.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    SidenavComponent,
    SupplierComponent,
    PartnersComponent,
    CustomersComponent,
    LocationsComponent,
    SearchPipe,
    ExpencetypeComponent,
    RemarksComponent,
    CategoryComponent,
    DesignationComponent,
    EmployeestatusComponent,
    ShiftComponent,
    AddEmployeeComponent,
    EquipmentsComponent,
    SparepartsComponent,
    MechinesetupComponent,
    AssigntaskComponent,
    OngoingtaskComponent,
    FinishedtaskComponent,
    PaymentsComponent,
    ExpencesComponent,
    IdleequipmentsComponent,
    ProfileComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgApexchartsModule
  
  ],
})
export class AppModule {}
