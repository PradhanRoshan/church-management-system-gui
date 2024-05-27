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
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MembersModule, StatusUpdate } from '../model/members/members.module';
import { MembersService } from '../service/members.service';
import {
  clearFormControl,
  getFormControlValue,
  setFormControlValue,
} from '../util/reactive-form/reactive-form.utils';

@Component({
  selector: 'app-members-lists',
  templateUrl: './members-lists.component.html',
  styleUrls: ['./members-lists.component.css'],
})
export class MembersListsComponent implements OnInit, AfterViewInit {
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

  //Variables

  showWarning: boolean = false;
  selectedFullName: string;
  updateStatus: FormGroup;
  memberInfoForm: FormGroup;
  onErrorSubmit: boolean = false;
  initalStatus: string;
  subscriptions: Subscription[] = [];
  membersTotalCount: number;
  membersActiveCount: number;
  membersInactiveCount: number;

  constructor(
    private fb: FormBuilder,
    private membersService: MembersService,
    private dialog: MatDialog,
    private router: Router
  ) { }
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
    this.createUpdateStatus();
    this.createMemberForm();
  }

  refreshDataTable() {
    this.subscriptions.push(
      this.membersService._allMembersData$.subscribe({
        next: (data) => {
          console.log(data);
          this.members = data;
          this.dataSource.data = data;
          this.membersTotalCount = this.members.length;
          this.membersActiveCount = this.members.filter(
            (e) => e.status === 'Active'
          ).length;
          this.membersInactiveCount = this.members.filter(
            (e) => e.status === 'Inactive'
          ).length;
        },
      })
    );
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
    this.router.navigate(['/edit-member', num]);
  }

  openEditDialog(row: any) {
    this.selectedFullName = row.firstName + ' ' + row.lastName;
    this.initalStatus = row.status;
    setFormControlValue(this.updateStatus, 'memberId', row.memberId);
    setFormControlValue(this.updateStatus, 'status', row.status);

    console.log(row);
    this.onEditModelOpen();
  }

  createUpdateStatus() {
    this.updateStatus = this.fb.group({
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
    clearFormControl(this.updateStatus, 'memberId');
    clearFormControl(this.updateStatus, 'status');
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
    let playLoad: StatusUpdate = {
      memberId: getFormControlValue(this.updateStatus, 'memberId'),
      status: getFormControlValue(this.updateStatus, 'status'),
    };
    console.log('update click');
    console.log(playLoad);

    if (getFormControlValue(this.updateStatus, 'status') == this.initalStatus) {
      this.onErrorSubmit = true;
      return;
    }

    this.subscriptions.push(
      this.membersService.updateStatus(playLoad).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          let error = err.error.text;
          if (error == 'Success') {
            this.updateMembersAfterModification();
            //this.refreshDataTable();
          }
        },
      })
    );

    this.onEditModelClose();
  }
  // On add Click rediricte to registration page
  onAddClick() {
    this.router.navigate(['/resistration']);
  }

  filterTabClick(event) {
    console.log('All clicked ' + event.value);
    let filterVal = event.value;
    switch (filterVal) {
      case 'all':
        this.refreshDataTable();
        break;
      case 'active':
        this.dataSource.data = this.members.filter(
          (e) => e.status === 'Active'
        );
        break;
      case 'inactive':
        this.dataSource.data = this.members.filter(
          (e) => e.status === 'Inactive'
        );
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
  onPrintClick(){
    window.print();
  }
}
