import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddFundType, AddPaymentMethod } from '../model/model.module';

@Injectable({
  providedIn: 'root'
})
export class TitheOfferingService {
  

  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  }

  titheOfferingBaseApi: string;



  constructor(private http: HttpClient) {
    this.titheOfferingBaseApi = "http://localhost:8080"
  }



  getAllFundTypes(): Observable<any> {
    console.log("somthing")
    return this.http.get<any>(`${this.titheOfferingBaseApi}/fund/fund-types`, this.requestOptions);
    //return this.http.post(`${this.postMemberApi}/add-member`,postData,this.requestOptions);
  }

  addFundType(postData: AddFundType): Observable<any> {
    return this.http.post<any>(`${this.titheOfferingBaseApi}/fund/add-fund`, postData, this.requestOptions);
  }

  deleteFundName(fundTypeID: any) {
    return this.http.post(`${this.titheOfferingBaseApi}/fund/delete-fund/` + fundTypeID, this.requestOptions, { responseType: 'text' });
  }


  getAllPaymentMethod(): Observable<any> {
    console.log("somthing")
    return this.http.get<any>(`${this.titheOfferingBaseApi}/payment/get-payment`, this.requestOptions);
    //return this.http.post(`${this.postMemberApi}/add-member`,postData,this.requestOptions);
  }

  addPaymentMethodName(postData: AddPaymentMethod): Observable<any> {
    return this.http.post<any>(`${this.titheOfferingBaseApi}/payment/add-payment`, postData, this.requestOptions);
  }

  deletePaymentMethodName(paymentMethodId: any) {
    return this.http.post(`${this.titheOfferingBaseApi}/payment/delete-payment/` + paymentMethodId, this.requestOptions, { responseType: 'text' });
  }

  saveTitheAndOffering(value: any) {
    return this.http.post(`${this.titheOfferingBaseApi}/tithe-offering/saveTO`,value , this.requestOptions);
  }

  updateFundName(postData: { fundTypeID: number; fundTypeName: string; }) {
    return this.http.post<any>(`${this.titheOfferingBaseApi}/fund/update-fund`, postData, this.requestOptions);
  }

}
