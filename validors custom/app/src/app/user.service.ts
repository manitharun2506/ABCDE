import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envi } from 'src/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private client: HttpClient) {}
  userLogin(data: any) {
    return this.client.post(`${envi.api_Url}users/login`, data);
  }
  getUserById(id: string) {
    return this.client.get(`${envi.api_Url}users/${id}`);
  }
  editimg(data:any,id:string){
    return this.client.put(`${envi.api_Url}users/${id}`,data);
  }
  updateUser(data: any) {
    return this.client.patch(`${envi.api_Url}users/${data._id}`, data);
  }
  getAllusers() {
    return this.client.get(`${envi.api_Url}users`);
  }

  getGlobalData() {
    return this.client.get(`${envi.api_Url}location`);
  }

  addLocation(data: any) {
    return this.client.post(`${envi.api_Url}location`, data);
  }

  getLocations() {
    return this.client.get(`${envi.api_Url}location/data`);
  }

  deleteLocation(id: any) {
    return this.client.delete(`${envi.api_Url}location/${id}`);
  }

  updateLocation(data: any) {
    return this.client.put(`${envi.api_Url}location/${data._id}`, data);
  }

  addSupplier(data: any) {
    return this.client.post(`${envi.api_Url}suppliers`, data);
  }

  getAllSuppliers() {
    return this.client.get(`${envi.api_Url}suppliers`);
  }

  deleteSupplier(id: any) {
    return this.client.delete(`${envi.api_Url}suppliers/${id}`);
  }
  editSupplier(data: any) {
    return this.client.patch(`${envi.api_Url}suppliers/edit/${data._id}`, data);
  }
  updateSupplier(data: any, id: any) {
    return this.client.put(`${envi.api_Url}suppliers/${id}`, data);
  }

  addPartner(data: any) {
    return this.client.post(`${envi.api_Url}partners`, data);
  }

  getPartner() {
    return this.client.get(`${envi.api_Url}partners`);
  }

  deletePartner(id: any) {
    return this.client.delete(`${envi.api_Url}partners/${id}`);
  }

  updatePartner(data: any, id: any) {
    return this.client.put(`${envi.api_Url}partners/${id}`, data);
  }

  addCustomer(formData: any) {
    return this.client.post(`${envi.api_Url}customers`, formData);
  }
  getCustomers() {
    return this.client.get(`${envi.api_Url}customers`);
  }
  updateCustomer(data: any, id: any) {
    return this.client.put(`${envi.api_Url}customers/${id}`, data);
  }
  deleteCustomer(id: any) {
    return this.client.delete(`${envi.api_Url}customers/${id}`);
  }

  addExpencetype(data: any) {
    return this.client.post(`${envi.api_Url}expences`, data);
  }

  getAllExpenceType() {
    return this.client.get(`${envi.api_Url}expences`);
  }

  deleteExpenceType(id: any) {
    return this.client.delete(`${envi.api_Url}expences/${id}`);
  }

  updateExpenceType(data: any) {
    return this.client.put(`${envi.api_Url}expences/${data._id}`, data);
  }

  addDesignation(data: any) {
    return this.client.post(`${envi.api_Url}designations`, data);
  }

  getAllDesignations() {
    return this.client.get(`${envi.api_Url}designations`);
  }

  deleteDesignation(id: any) {
    return this.client.delete(`${envi.api_Url}designations/${id}`);
  }

  updateDesignaton(data: any) {
    return this.client.put(`${envi.api_Url}designations/${data._id}`, data);
  }

  addRemarks(data: any) {
    return this.client.post(`${envi.api_Url}remarks`, data);
  }

  getAllRemarks() {
    return this.client.get(`${envi.api_Url}remarks`);
  }

  deleteRemarks(id: any) {
    return this.client.delete(`${envi.api_Url}remarks/${id}`);
  }

  updateRemarks(data: any) {
    return this.client.put(`${envi.api_Url}remarks/${data._id}`, data);
  }

  addCategory(data: any) {
    return this.client.post(`${envi.api_Url}categories`, data);
  }

  getAllCategory() {
    return this.client.get(`${envi.api_Url}categories`);
  }

  deleteAllCategory(id: any) {
    return this.client.delete(`${envi.api_Url}categories/${id}`);
  }

  updateCategory(data: any) {
    return this.client.put(`${envi.api_Url}categories/${data._id}`, data);
  }

  addEmpStatus(data: any) {
    return this.client.post(`${envi.api_Url}empstatus`, data);
  }

  getAllStatus() {
    return this.client.get(`${envi.api_Url}empstatus`);
  }

  deleteEmpStatus(id: any) {
    return this.client.delete(`${envi.api_Url}empstatus/${id}`);
  }

  updateEmpStatus(data: any) {
    return this.client.put(`${envi.api_Url}empstatus/${data._id}`, data);
  }

  addShift(data: any) {
    return this.client.post(`${envi.api_Url}shifts`, data);
  }

  getAllShifts() {
    return this.client.get(`${envi.api_Url}shifts`);
  }

  deleteShift(id: any) {
    return this.client.delete(`${envi.api_Url}shifts/${id}`);
  }

  updateShift(data: any) {
    return this.client.put(`${envi.api_Url}shifts/${data._id}`, data);
  }

  addEmp(data: any) {
    return this.client.post(`${envi.api_Url}employees`, data);
  }

  getAllEmp() {
    return this.client.get(`${envi.api_Url}employees`);
  }

  deleteEmp(id: any) {
    return this.client.delete(`${envi.api_Url}employees/${id}`);
  }

  updateEmp(data: any, id: any) {
    return this.client.put(`${envi.api_Url}employees/${id}`, data);
  }

  addEquipment(data: any) {
    return this.client.post(`${envi.api_Url}equipments`, data);
  }

  getAllEquipments() {
    return this.client.get(`${envi.api_Url}equipments`);
  }

  deleteEquipment(id: any) {
    return this.client.delete(`${envi.api_Url}equipments/${id}`);
  }

  updateEquipment(data: any) {
    return this.client.patch(`${envi.api_Url}equipments/${data._id}`, data);
  }

  addSpares(data: any) {
    return this.client.post(`${envi.api_Url}spareparts`, data);
  }

  getAllSpares() {
    return this.client.get(`${envi.api_Url}spareparts`);
  }

  deleteSpare(id: any) {
    return this.client.delete(`${envi.api_Url}spareparts/${id}`);
  }

  updateSpare(data: any) {
    return this.client.patch(`${envi.api_Url}spareparts/${data._id}`, data);
  }

  addSetupMech(data: any) {
    return this.client.post(`${envi.api_Url}mechsetup`, data);
  }

  getAllMechSetups() {
    return this.client.get(`${envi.api_Url}mechsetup`);
  }

  deleteMechSetup(id: any) {
    return this.client.delete(`${envi.api_Url}mechsetup/${id}`);
  }

  updateMechineSetUp(data: any) {
    return this.client.patch(`${envi.api_Url}mechsetup/${data._id}`, data);
  }

  assignTask(data: any) {
    return this.client.post(`${envi.api_Url}tasks`, data);
  }

  getOngoingTasks() {
    return this.client.get(`${envi.api_Url}tasks/ongoing`);
  }

  getTaskById(id: any) {
    return this.client.get(`${envi.api_Url}tasks/${id}`);
  }

  getCompletedTasks() {
    return this.client.get(`${envi.api_Url}tasks/completed`);
  }

  deleteTask(id: any) {
    return this.client.delete(`${envi.api_Url}tasks/${id}`);
  }

  updateTask(data: any) {
    return this.client.patch(`${envi.api_Url}tasks/${data._id}`, data);
  }

  addRefill(data: any) {
    return this.client.post(`${envi.api_Url}refills`, data);
  }
  deleteRefill(id: any) {
    return this.client.delete(`${envi.api_Url}refills/${id}`);
  }

  updateRefill(data: any) {
    return this.client.patch(`${envi.api_Url}refills/${data._id}`, data);
  }

  getRefillsByTaskId(data: any) {
    return this.client.post(`${envi.api_Url}refills/getbytaskid`, data);
  }

  getAllPayments() {
    return this.client.get(`${envi.api_Url}payments`);
  }

  getPendingPayments() {
    return this.client.get(`${envi.api_Url}payments/pendingpayments`);
  }

  addPayment(data: any) {
    return this.client.post(`${envi.api_Url}payments`, data);
  }

  deletePayment(id: string) {
    return this.client.delete(`${envi.api_Url}payments/${id}`);
  }

  updatePayment(data: any) {
    return this.client.patch(`${envi.api_Url}payments/${data._id}`, data);
  }

  updateTaskPaymentStatus(data: any) {
    return this.client.patch(`${envi.api_Url}payments/task`, data);
  }

  addExpType(data: any) {
    return this.client.post(`${envi.api_Url}exptype`, data);
  }

  getAllExpTypes() {
    return this.client.get(`${envi.api_Url}exptype`);
  }
  deleteExpType(id: string) {
    return this.client.delete(`${envi.api_Url}exptype/${id}`);
  }

  updateExpType(data: any) {
    return this.client.patch(`${envi.api_Url}exptype/${data._id}`, data);
  }
}
