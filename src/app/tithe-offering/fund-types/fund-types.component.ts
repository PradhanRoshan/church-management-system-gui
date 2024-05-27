import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TitheOfferingService } from '../service/tithe-offering.service';
import { AddFundType } from '../model/model.module';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-fund-types',
  templateUrl: './fund-types.component.html',
  styleUrls: ['./fund-types.component.css']
})
export class FundTypesComponent implements OnInit {
  @ViewChild('OnDeleteFundType', { static: true }) OnDeleteFundType: TemplateRef<any>;
  @ViewChild('OnEditFundType', { static: true }) OnEditFundType: TemplateRef<any>;
  fundTypes = [];
  displayedColumns: string[] = ['demo-position', 'demo-name','payment-action'];
  dataSource = [];
  fundName:string;
  fundPresent:boolean=false;
  duplicate:boolean=false;
  selecterFundTypeId:number;
  selecterFundName:string;
  constructor(private titheOfferingService: TitheOfferingService,private dialog: MatDialog,) {

  }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable() {
    this.titheOfferingService.getAllFundTypes().subscribe(
      data => {
        this.dataSource = data.sort((a,b)=> a.fundTypeID - b.fundTypeID);
        console.log(this.dataSource)
      }
    );
  }

  onAddClick() {
    if(this.fundName.trim().length==0){
      return;
    }
    let postData:AddFundType={
      fundTypeName:this.fundName
    }

    console.log(postData)
    this.titheOfferingService.addFundType(postData).subscribe(
      { next:(data)=>{
        console.log(data)
      },
      error: (error)=>{
        let err = error.error.text;
        console.log(error.error.text)

        if(err == 'Fund name is already present'){
          this.fundPresent=true;

          return;
        } else if(err == 'Success'){
          this.refreshTable();
          this.fundName='';
          this.fundPresent=false;
        }
      }
  });
  }
  onDeleteModelOpen(element){
    this.selecterFundTypeId=element.fundTypeID;
    this.selecterFundName=element.fundTypeName;
    this.dialog.open(this.OnDeleteFundType);
  }

  onDeleteClick() {
    this.titheOfferingService.deleteFundName(this.selecterFundTypeId).subscribe(
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
    this.duplicate=false;
    this.modalClose();
  }

  modalClose(){
    this.dialog.closeAll();
  }
  onEditModelOpen(element){
    this.selecterFundTypeId=element.fundTypeID;
    this.selecterFundName=element.fundTypeName;
    this.fundName=this.selecterFundName;
    this.dialog.open(this.OnEditFundType);

  }

  onUpdateClick(){
    console.log(this.fundName.toLowerCase())
    console.log(this.selecterFundName.toLowerCase())
    let fName=this.fundName.toLowerCase

    if((this.fundName.toLowerCase().trim()==this.selecterFundName.toLowerCase())|| this.fundName.trim().length==0){
      this.duplicate=true;
      return;
    }

    let postData =
    {
      fundTypeID:this.selecterFundTypeId,
      fundTypeName:this.fundName.trim()
    } 
    console.log(postData)
    this.titheOfferingService.updateFundName(postData).subscribe({
      next:(data)=>{
        console.log(data)
      },
      error:(err)=>{
        let txt= err.error.text;
        console.log(err.error.text)

        if(txt =="Success"){
          this.refreshTable();
          this.fundName='';
          this.duplicate=false;
          this.modalClose();
        }
        else if(txt =="Fund Name is Duplicate"){
          this.duplicate=true;
          return;
        }
      }
    });
   
  }


}
