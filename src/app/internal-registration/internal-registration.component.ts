import { Component, OnInit } from '@angular/core';
import { MembersModule } from './model/members/members.module';
import { MembersService } from './service/members.service';

@Component({
  selector: 'app-internal-registration',
  templateUrl: './internal-registration.component.html',
  styleUrls: ['./internal-registration.component.css']
})
export class InternalRegistrationComponent implements OnInit {
 
  members:MembersModule[];
  activeMembers:MembersModule[];
  inActiveMembers:MembersModule[];
 
 constructor( private membersService:MembersService){

 }
 
 
 
  ngOnInit(): void {
    this.getAllMembersInfo();
    this.getActiveMembers();
    this.getInActiveMembers();
    
  }

  // getMemberById(){

  // }

  getAllMembersInfo() {
    this.membersService.getAllMembers().subscribe({
      next: (data) => {
        console.log(data);
        this.members=data;
        this.membersService._allMembersData$.next(this.members);
      },
    });
  }

  getActiveMembers(){
    this.membersService.getAllActiveMembers().subscribe({
      next: (data) => {
        console.log(data);
        this.activeMembers=data;
        this.membersService._allActiveMembersData$.next(this.activeMembers);
      },
    });
  }

  getInActiveMembers(){
    this.membersService.getAllInactiveMembers().subscribe({
      next: (data) => {
        console.log(data);
        this.inActiveMembers=data;
        this.membersService._allInactiveMembersData$.next(this.inActiveMembers);
       
      },
    });
  }



}
