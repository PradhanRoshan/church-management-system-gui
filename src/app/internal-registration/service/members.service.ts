import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveAccount, InactiveAccount, MembersModule, SendEmail } from '../model/members/members.module';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
   
   

  requestOptions ={
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*',
    }),
  }
 
  membersBaseApi:string;

  _allMembersData$ = new BehaviorSubject<MembersModule[]>([]);

  _allActiveMembersData$ = new BehaviorSubject<MembersModule[]>([]);

  _allInactiveMembersData$ = new BehaviorSubject<MembersModule[]>([]);

  constructor(private http:HttpClient) { 

    this.membersBaseApi='http://localhost:8080/api';

  }
// get-member/{memberId}
  getMemberById(_id: number) :Observable<any> {
    return this.http.get< any>( `${this.membersBaseApi}/get-member/`+_id,this.requestOptions);
  }

 getAllMembers() :Observable<any>{
  console.log("somthing")
  return this.http.get< any>( `${this.membersBaseApi}/get-member`,this.requestOptions);
  //return this.http.post(`${this.postMemberApi}/add-member`,postData,this.requestOptions);
  }

  getAllActiveMembers() :Observable<any>{
    console.log("somthing")
    return this.http.get< any>( `${this.membersBaseApi}/active-members`,this.requestOptions);
    //return this.http.post(`${this.postMemberApi}/add-member`,postData,this.requestOptions);
    }

  getAllInactiveMembers() :Observable<any>{
      console.log("somthing")
      return this.http.get< any>( `${this.membersBaseApi}/inactive-members`,this.requestOptions);
      //return this.http.post(`${this.postMemberApi}/add-member`,postData,this.requestOptions);
    }

  inactiveMember(playLoad: InactiveAccount) {
    return this.http.post(`${this.membersBaseApi}/inactive-member`,playLoad,this.requestOptions);
  }

  activeMember(playLoad: ActiveAccount) {
    return this.http.post(`${this.membersBaseApi}/active-member`,playLoad,this.requestOptions);
  }

  updateStatus(playLoad: ActiveAccount) {
    return this.http.post(`${this.membersBaseApi}/update-status`,playLoad,this.requestOptions);
  }

  registerMember(postData: any) {
    return this.http.post(`${this.membersBaseApi}/add-member`,postData,this.requestOptions);
  }

  updateMemberInfo(playLoad: any) {
    return this.http.post(`${this.membersBaseApi}/update-information`,playLoad,this.requestOptions);
  }

  sentEmail(postData: SendEmail) {
    return this.http.post(`${this.membersBaseApi}/sent-email`,postData,this.requestOptions);
  }


}
