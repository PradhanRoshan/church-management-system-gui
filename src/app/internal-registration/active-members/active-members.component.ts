import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  InactiveAccount,
  MembersModule,
} from '../model/members/members.module';
import { MembersService } from '../service/members.service';
import {
  clearFormControl,
  getFormControlValue,
  setFormControlValue,
} from '../util/reactive-form/reactive-form.utils';

@Component({
  selector: 'app-active-members',
  templateUrl: './active-members.component.html',
  styleUrls: ['./active-members.component.css'],
})
export class ActiveMembersComponent implements OnInit, AfterViewInit {
  members: MembersModule[];
  activeMembers: MembersModule[];
  inActiveMembers: MembersModule[];

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'maritalStatus',
    'phone',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<MembersModule>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('OnEditDialog', { static: true }) OnEditDialog: TemplateRef<any>;
  @ViewChild('OnViewDialog', { static: true }) OnViewDialog: TemplateRef<any>;

  showWarning: boolean = false;
  selectedFullName: string;
  inActiveForm: FormGroup;
  memberInfoForm: FormGroup;
  onErrorSubmit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private membersService: MembersService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.refreshDataTable();
    this.createInactiveForm();
    this.createMemberForm();
  }

  refreshDataTable() {
    this.membersService._allActiveMembersData$.subscribe({
      next: (data) => {
        console.log(data);
        this.activeMembers = data;
        this.dataSource.data = data;

        console.log(this.dataSource);
      },
    });
  }

  onEditClick(event: any) {
    console.log('clicked');
    console.log(event);
  }

  onViewClick(row: any) {
    console.log(row.memberId);

    this.selectedFullName = row.firstName + ' ' + row.lastName;
    setFormControlValue(this.memberInfoForm, 'zip', row.addressDTO.zip);
    setFormControlValue(this.memberInfoForm, 'state', row.addressDTO.state);
    setFormControlValue(this.memberInfoForm, 'city', row.addressDTO.city);
    setFormControlValue(
      this.memberInfoForm,
      'aptNo',
      row.addressDTO.aptNo == '' ? '-' : row.addressDTO.aptNo
    );
    setFormControlValue(this.memberInfoForm, 'street', row.addressDTO.street);
    setFormControlValue(this.memberInfoForm, 'memberSince', row.memberSince);
    setFormControlValue(this.memberInfoForm, 'emailId', row.emailId);
    setFormControlValue(this.memberInfoForm, 'phone', row.phone);
    setFormControlValue(this.memberInfoForm, 'status', row.status);
    setFormControlValue(
      this.memberInfoForm,
      'maritalStatus',
      row.maritalStatus
    );
    setFormControlValue(this.memberInfoForm, 'memberDob', row.memberDob);
    this.onViewModelOpen();
  }

  onViewClose() {
    console.log('closed');
    this.onViewModelClose();
  }

  onHyperLinkClick(num: any) {
    // console.log(event.target.innerText)
    console.log(num);
    // edit-member
    this.router.navigate(['/edit-member',num]);
  }

  openEditDialog(row: any) {
    this.selectedFullName = row.firstName + ' ' + row.lastName;
    setFormControlValue(this.inActiveForm, 'memberId', row.memberId);
    setFormControlValue(this.inActiveForm, 'status', row.status);

    console.log(row);
    this.onEditModelOpen();
  }

  createInactiveForm() {
    this.inActiveForm = this.fb.group({
      memberId: [''],
      status: [''],
    });
  }

  createMemberForm() {
    this.memberInfoForm = this.fb.group({
      memberDob: [''],
      maritalStatus: [''],
      status: [''],
      phone: [''],
      emailId: [''],
      memberSince: [''],
      street: [''],
      aptNo: [''],
      city: [''],
      state: [''],
      zip: [''],
    });
  }

  //Active / Inactive Click
  onInactiveClick() {
    this.onErrorSubmit = false;
    this.showWarning = true;
  }
  onActiveClick() {
    this.onErrorSubmit = false;
    this.showWarning = false;
  }

  //Pop-Up Model Open/Close
  onEditModelOpen() {
    this.dialog.open(this.OnEditDialog);
  }

  onEditModelClose() {
    this.onErrorSubmit = false;
    this.showWarning = false;
    clearFormControl(this.inActiveForm, 'memberId');
    clearFormControl(this.inActiveForm, 'status');
    this.dialog.closeAll();
  }

  //View Model
  onViewModelOpen() {
    this.dialog.open(this.OnViewDialog);
  }

  onViewModelClose() {
    this.dialog.closeAll();
  }

  onUpdateClick() {
    let playLoad: InactiveAccount = {
      memberId: getFormControlValue(this.inActiveForm, 'memberId'),
      status: getFormControlValue(this.inActiveForm, 'status'),
    };
    console.log('update click');
    console.log(playLoad);

    if (getFormControlValue(this.inActiveForm, 'status') === 'Active') {
      this.onErrorSubmit = true;
      return;
    }

    this.membersService.inactiveMember(playLoad).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        let error = err.error.text;
        if (error == 'Success') {
          this.updateMembersAfterModification();
         // this.refreshDataTable();
        }
      },
    });

    this.onEditModelClose();
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
