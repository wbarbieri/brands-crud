import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  actionBtn : string = "Save";
  brandsFrom !: FormGroup;
  fileUploadService: any;
  constructor(private formBuilder : FormBuilder, 
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) {}

  ngOnInit(): void {
    this.brandsFrom = this.formBuilder.group({
      diagName : ['', Validators.required],
      diagCountry : ['', Validators.required],
      diagValue : ['', Validators.required],
      diagIndustry : ['', Validators.required],
      diagDate : ['', Validators.required],
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.brandsFrom.controls['diagName'].setValue(this.editData.diagName);
      this.brandsFrom.controls['diagCountry'].setValue(this.editData.diagCountry);
      this.brandsFrom.controls['diagValue'].setValue(this.editData.diagValue);
      this.brandsFrom.controls['diagIndustry'].setValue(this.editData.diagIndustry);
      this.brandsFrom.controls['diagDate'].setValue(this.editData.diagDate);
    }
  }
  addbrands(){
    if(!this.editData){
      if(this.brandsFrom.valid){
        this.api.postBrand(this.brandsFrom.value).subscribe({
          next:(res)=>{
           // alert("Brand added successfully");
            this.brandsFrom.reset();
            this.dialogRef.close('save');
          },
        
        })
      }
    }
    else{
      this.updateBrand();
    }
    
  }
  updateBrand(){
    this.api.putBrand(this.brandsFrom.value, this.editData.id)
    .subscribe({
      next:(res)=>{
       // alert("Brand Update");
        this.brandsFrom.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error");
      }
    })
  }
}


