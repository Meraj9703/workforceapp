import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpserviceService } from '../service/empservice.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {
  myForm:FormGroup;
  emprecord: any;
  empdet: any;
  img:any;
  sellersPermitFile: any;
  sellersPermitString: string;
  fileToUpload: any;
  imageUrl: any;
  
  console.log("hi all")
  constructor(private ar:ActivatedRoute,private _sanitizer: DomSanitizer,private empservice:EmpserviceService,private routes:Router) { 

    this.myForm=new FormGroup({
      first_name:new FormControl('',Validators.required),
      last_name:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      // upload:new FormControl('')
    })
  }

  ngOnInit(): void {
    this.empdet=this.ar.snapshot.queryParamMap.get('id')
    this.empgetdetails();
  }

  empgetdetails(){
       
     this.empservice.getEmployeebyid(this.empdet).subscribe((dt:any)=>{
       this.emprecord=dt;  
       this.img = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
       +this.emprecord.upload);
       this.myForm.get('first_name').setValue(this.emprecord.first_name);
       this.myForm.get('last_name').setValue(this.emprecord.last_name);
       this.myForm.get('email').setValue(this.emprecord.email);
      //  this.myForm.get('upload').setValue(this.emprecord.upload)
       
     })
    }

   
    picked(event, file: FileList) {
      this.fileToUpload = file.item(0);
  
      //Show image preview
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      // this.currentId = field;
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        
          this.sellersPermitFile = file;
          this.handleInputChange(file); //turn into base64
        
       
      }
      else {
        alert("No file selected");
      }
     
    }
    handleInputChange(files) {
      var file = files;
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onloadend = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
    _handleReaderLoaded(e) {
      let reader = e.target;
      var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
      //this.imageSrc = base64result;
      // let id = this.currentId;
          this.sellersPermitString = base64result;
         
  
      // this.log();
    }
   
    Cancel(){
      this.routes.navigate(['employeelist'],{ queryParams: { id:this.empdet }});
    }
  subData(){
      if(this.myForm.valid==true){
        var obj={
          first_name:this.myForm.controls.first_name.value,
          last_name:this.myForm.controls.last_name.value,
          email:this.myForm.controls.email.value,
          upload:this.sellersPermitString
        }
        this.empservice.editEmployee(this.empdet,obj).subscribe((dt:any)=>{
          
            this.routes.navigate(['employeelist'],{ queryParams: { id:this.empdet }});
          
        })

      } 
      

         
  }

  
}
