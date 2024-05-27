import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MembersModule { 
  memberId?:number;
  firstName:string;
  lastName:string;
  middleName?:string;
  memberDob:string;
  gender:string;
  maritalStatus:string;
  status:string;
  phone:string;
  emailId:string;
  memberSince:Date;
  address:Address;
  // length: number;
}

export class Address{
  idAddr?:number;
  street:string;
  aptNo:string;
  city:string;
  state:string;
  zip:string;
}


export interface InactiveAccount{
  memberId:number,
  status:string
 }

 export interface ActiveAccount{
  memberId:number,
  status:string
 }
 export interface StatusUpdate{
  memberId:number,
  status:string
 }

 export interface SendEmail{
  name:string,
  toEmail:number,
  emailSubject:string,
  emailBody:string
 }



