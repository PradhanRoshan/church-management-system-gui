import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MembersService } from '../internal-registration/service/members.service';
import { MembersModule } from '../internal-registration/model/members/members.module';
import { TitheOfferingService } from './service/tithe-offering.service';
// export interface State {
//   flag: string;
//   name: string;
//   population: string;
// }

// export const _filter = (opt: string[], value: string): string[] => {
//   const filterValue = value.toLowerCase();

//   return opt.filter(item => item.toLowerCase().includes(filterValue));
// };
@Component({
  selector: 'app-tithe-offering',
  templateUrl: './tithe-offering.component.html',
  styleUrls: ['./tithe-offering.component.css']
})

export class TitheOfferingComponent implements OnInit {
  stateCtrl = new FormControl('');
  selectedMemberName: string;
  selectedMemberId: number;
  // selectedMember = new FormControl('');
  filteredStates: Observable<MembersModule[]>;

  // Creating Form
  tietheOfferingForm: FormGroup;
  formArrays: FormGroup;
  items!: FormArray;
  totalAmount: number = 0;
  disabledAdd: boolean = false;
  fundTypes = [];
  paymentTypes = [];




  members: MembersModule[];
  valueSelected: boolean = false;
  constructor(private memberService: MembersService, private titheOfferingService: TitheOfferingService) {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.members.slice())),

    );
  }

  ngOnInit() {
    this.getMembersDetails();
    this.OnValueChange();
    this.getPaymentType();
    this.getFundType();
    // this.totalAmount = this.tietheOfferingForm.get('amountContributed').value

  }

  getFundType() {
    this.titheOfferingService.getAllFundTypes().subscribe(
      data => {
        this.fundTypes = data;
        console.log(this.fundTypes)
      }
    )

  }
  getPaymentType() {
    this.titheOfferingService.getAllPaymentMethod().subscribe(
      data => {
        this.paymentTypes = data;
        console.log(this.paymentTypes)
      }
    )
  }

  createTitheAndOfferingForm() {
    this.tietheOfferingForm = new FormGroup({
      memberId: new FormControl(this.selectedMemberId),
      titheOffering: new FormArray([])
    });

  }

  getMembersDetails() {
    this.memberService._allActiveMembersData$.subscribe({
      next: (data) => {
        console.log(data)
        this.members = data;
        // this.members.forEach(m=>this.stateGroups.map(t=>t.names.push(m.firstName+' '+m.lastName)))

        console.log(this.members)
      }
    })
  }

  OnValueChange() {
    this.stateCtrl.valueChanges.subscribe(value => {
      console.log(value)
      if (!value) {
        this.valueSelected = false;
      }
    })
  }

  private _filterStates(value: string): MembersModule[] {
    const filterValue = value.trim().toLowerCase();
    return this.members.filter(state => (state.firstName + ' ' + state.lastName).toLowerCase().includes(filterValue));
  }

  theValueSelected(event) {
    console.log(event)
    this.selectedMemberId = event.memberId;
    this.selectedMemberName = event.firstName + ' ' + event.lastName;
    this.createTitheAndOfferingForm();
    this.onAddClick();
    if (event) {
      this.valueSelected = true;

    }

  }

  onAddClick() {
      this.items = this.tietheOfferingForm.get('titheOffering') as FormArray;
      // if(this.titheOffering.value.length > this.fundTypes.length){
        this.items.push(this.generateForm());
      // }
      
  }

  onDeleteClick(i: number) {
    console.log(i)
    this.items = this.tietheOfferingForm.get('titheOffering') as FormArray;
    this.items.removeAt(i);
  }

  generateForm(): FormGroup {
    this.formArrays = new FormGroup({
      fundTypeID: new FormControl(''),
      paymentMethodId: new FormControl(''),
      amountContributed: new FormControl(''),
      fundNote: new FormControl('')
    })
    return this.formArrays;
  }

  onFormSubmit() {
    console.log(this.tietheOfferingForm.value);
    this.titheOfferingService.saveTitheAndOffering(this.tietheOfferingForm.value).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error.error.text)
        if (error.error.text == 'Success') {
          this.tietheOfferingForm.reset();
          this.createTitheAndOfferingForm();
          this.onAddClick();
        }
      }
    );
  }
  valChange(){
    console.log(this.formArrays.get('amountContributed').value)
  }
  get titheOffering() {
    return this.tietheOfferingForm.get('titheOffering') as FormArray;
  }

  // Future Function
  // hasDuplicate(value, valueIndex):boolean{
  //   let count =0;
  //   this.fundTypes.values.forEach((controlValue:any, controlIndex:number)=>{
  //     if(valueIndex !== controlIndex && value == controlValue){
  //       count ++
  //     }
  //   });
  //   if(count>=1){
  //     return true;
  //   } else{
  //     return false;
  //   }
  // }
}
