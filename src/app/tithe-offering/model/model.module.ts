import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ModelModule { }

export class AddFundType{
  fundTypeName:string;
}
export class AddPaymentMethod{
  paymentMethodName:string;
}


// export class AddTitheAndOffering{
//   memberId:string;

// }
