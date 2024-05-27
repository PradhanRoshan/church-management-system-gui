import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersModule } from '../model/members/members.module';
import { MembersService } from '../service/members.service';
import { setFormControlValue } from '../util/reactive-form/reactive-form.utils';

@Component({
  selector: 'app-edit-members',
  templateUrl: './edit-members.component.html',
  styleUrls: ['./edit-members.component.css']
})
export class EditMembersComponent implements OnInit, AfterViewInit {

  members: MembersModule[];
  activeMembers: MembersModule[];
  inActiveMembers: MembersModule[];

  id: number;
  addressId: number;
  editMemberForm: FormGroup;
  member: MembersModule;

  constructor(private router: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder,
    private membersService: MembersService) {

  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit() {
    this.id = this.router.snapshot.params['id']
    this.getMemberById(this.id);
    this.createRegisterForm();

    //  this.setEditMemberData(this.member);

  }

  getMemberById(_id: number) {
    this.membersService.getMemberById(_id).subscribe(data => {

      this.member = data;

      console.log(this.member)
      // this.addressId=this.member.address.idAddr;
      this.setEditMemberData(this.member);
      // this.addressId=;
    });


  }

  createRegisterForm() {
    this.editMemberForm = this.fb.group({
      memberId: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      memberDob: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      emailId: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        idAddr: [''],
        street: ['', Validators.required],
        aptNo: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
      })
    });
  }

  setEditMemberData(member: any) {
    setFormControlValue(this.editMemberForm, 'memberId', member.memberId);
    setFormControlValue(this.editMemberForm, 'firstName', member.firstName);
    setFormControlValue(this.editMemberForm, 'lastName', member.lastName);
    setFormControlValue(this.editMemberForm, 'middleName', member.middleName);
    setFormControlValue(this.editMemberForm, 'memberDob', member.memberDob);
    setFormControlValue(this.editMemberForm, 'gender', member.gender);
    setFormControlValue(this.editMemberForm, 'maritalStatus', member.maritalStatus);
    setFormControlValue(this.editMemberForm, 'phone', member.phone);
    setFormControlValue(this.editMemberForm, 'emailId', member.emailId);
    setFormControlValue(this.editMemberForm, 'address.idAddr', member.addressDTO.idAddr);
    setFormControlValue(this.editMemberForm, 'address.street', member.addressDTO.street);
    setFormControlValue(this.editMemberForm, 'address.aptNo', member.addressDTO.aptNo === '' ? '--' : member.addressDTO.aptNo);
    setFormControlValue(this.editMemberForm, 'address.city', member.addressDTO.city);
    setFormControlValue(this.editMemberForm, 'address.state', member.addressDTO.state);
    setFormControlValue(this.editMemberForm, 'address.zip', member.addressDTO.zip);
  }

  onFormSubmit() {
    let playLoad = this.editMemberForm.value;

    console.log(playLoad);

    this.membersService.updateMemberInfo(playLoad).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.error.text);
        let confirmText = error.error.text;

        if (confirmText == 'Success') {
          this.updateMembersAfterModification();
          this.route.navigate(['/all-members']);

        } else {
          console.log(confirmText);
        }

        // this.updateMembersAfterModification();
      });

  }

  updateMembersAfterModification() {
    this.membersService.getAllMembers().subscribe({
      next: (data) => {
        console.log(data);
        this.members = data;
        this.membersService._allMembersData$.next(this.members);
      },
    });

    this.membersService.getAllActiveMembers().subscribe({
      next: (data) => {
        console.log(data);
        this.activeMembers = data;
        this.membersService._allActiveMembersData$.next(this.activeMembers);
      },
    });

    this.membersService.getAllInactiveMembers().subscribe({
      next: (data) => {
        console.log(data);
        this.inActiveMembers = data;
        this.membersService._allInactiveMembersData$.next(this.inActiveMembers);
      },
    });

  }

}
