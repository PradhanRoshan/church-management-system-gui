import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MembersModule, SendEmail } from '../model/members/members.module';
import { MembersService } from '../service/members.service';

@Component({
  selector: 'app-members-registration',
  templateUrl: './members-registration.component.html',
  styleUrls: ['./members-registration.component.css'],
})
export class MembersRegistrationComponent implements AfterViewInit, OnInit {
  // 
  registerMemberForm: FormGroup;
  members: MembersModule[];
  activeMembers: MembersModule[];
  errorOccured: boolean = false;
  soBar: boolean = false;


  constructor(private membersService: MembersService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerMemberForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      memberDob: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      emailId: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: ['', Validators.required],
        aptNo: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
      })
    });
  }




  ngAfterViewInit() { }

  onFormSubmit() {
    console.log(this.registerMemberForm.value)
    this.soBar = true;
    let postData = this.registerMemberForm.value;

    this.membersService.registerMember(postData).subscribe(data => {
      console.log(data)
    },
      error => {
        this.soBar = false;
        console.log(error)
        let errorTxt = error.error.text;
        if (errorTxt == "Success") {
          // this.soBar=false;
          alert("Member Sucessfully Added");
          this.updateMembersData();
          this.sendEmail();
          this.router.navigate(['/all-members']);
          // this.clearForm();
        } else {
          // this.soBar=false;
          this.errorOccured = true;
          setTimeout(() => {
            this.errorOccured = false;
          }, 4000);


        }
      });

  }
  sendEmail() {
    let memberName = this.registerMemberForm.get('firstName').value + ' ' + this.registerMemberForm.get('lastName').value;
    let emailSubject = "Welcome to KJM.";
    let emailBody = "";
    // " Hi" + " " + memberName + ', ' + "Welcome to King Jesus Ministry. We hope that your time with us offers you the chance to explore and deepen your faith and enrich the love you have for the Lord.";
    let postData: SendEmail = {
      name: memberName,
      toEmail: this.registerMemberForm.get('emailId').value,
      emailSubject: emailSubject,
      emailBody: emailBody
    }
    this.membersService.sentEmail(postData).subscribe(data => {
      console.log(data);
    },
      error => {
        console.log(error.error.text);
      });
    console.log(postData);
  }
  updateMembersData() {
    this.membersService.getAllMembers().subscribe(data => {
      this.members = data;
      this.membersService._allMembersData$.next(this.members);
    });
    this.membersService.getAllActiveMembers().subscribe(data => {
      this.activeMembers = data;
      this.membersService._allActiveMembersData$.next(this.activeMembers);
    });
  }

  clearForm() {
    //  clearFormControl(this.registerMemberForm,'firstName');
    this.registerMemberForm.reset();

  }
}
