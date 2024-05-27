import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TitheOfferingService } from '../service/tithe-offering.service';
import { AddPaymentMethod } from '../model/model.module';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {

  @ViewChild('OnDeletePaymentType', { static: true }) OnDeletePaymentType: TemplateRef<any>;

  paymentTypes = [];
  displayedColumns: string[] = ['payment-id', 'payment-name', 'payment-action'];
  dataSource = [];
  paymentTypeName: string;
  paymentMethodPresent: boolean = false;
  selectedPaymentTypeId:number;
  selectedPaymentName:string;

  constructor(private titheOfferingService: TitheOfferingService,private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable() {
    this.titheOfferingService.getAllPaymentMethod().subscribe(
      data => {
        this.dataSource = data.sort((a, b) => a.paymentMethodId - b.paymentMethodId);
        console.log(this.dataSource)
      }
    );
  }

  onAddClick() {
    if (this.paymentTypeName.trim().length == 0) {
      return;
    }
    let postData: AddPaymentMethod = {
      paymentMethodName: this.paymentTypeName
    }

    console.log(postData)
    this.titheOfferingService.addPaymentMethodName(postData).subscribe(
      data => {
        console.log(data)
      },
      error => {
        let err = error.error.text;
        console.log(error.error.text)

        if (err == 'Payment name is already present') {
          this.paymentMethodPresent = true;

          return;
        } else if (err == 'Success') {
          this.refreshTable();
          this.paymentTypeName = '';
          this.paymentMethodPresent = false;
        }
      }
    );
  }

  onDeletePaymentClick(element){
    this.selectedPaymentTypeId=element.paymentMethodId;
    this.selectedPaymentName=element.paymentMethodName;
    this.dialog.open(this.OnDeletePaymentType);
  }

  onDeletClick() {
    this.titheOfferingService.deletePaymentMethodName(this.selectedPaymentTypeId).subscribe(
      {
        next: (data) => {
          console.log(data)
            if (data == 'Success') {
              this.refreshTable();
              this.modalClose();
            } else if(data == 'Invalid Payment Id'){
              return ;
            }
        },
        error:(err)=>{
          console.error(err.error)
        },
        complete:()=>{
          console.info('complete')
        }
      }
    );
  }

  onCancleClick(){
    this.modalClose();
  }

  modalClose(){
    this.dialog.closeAll();
  }
}
