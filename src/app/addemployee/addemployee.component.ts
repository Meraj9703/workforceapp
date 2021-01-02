import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpserviceService } from '../service/empservice.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

  myForm:FormGroup;
  empdet: any;
  currentId: number = 0;
  sellersPermitFile: any;
  sellersPermitString: string;
  fileToUpload: any;
  imageUrl: any;
  constructor(private ar:ActivatedRoute,private empservice:EmpserviceService,private routes:Router) { 
    this.myForm=new FormGroup({
      first_name:new FormControl('',Validators.required),
      last_name:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      // upload:new FormControl('',Validators.required)
    })
    //this.subData()
  }

  ngOnInit(): void {
   
    
  }

 

  subData(){
    
    if(this.myForm.valid==true){
      var obj={
        first_name:this.myForm.controls.first_name.value,
        last_name:this.myForm.controls.last_name.value,
        email:this.myForm.controls.email.value,
        upload:this.sellersPermitString
      }
      console.log(obj)
      this.empservice.postEmployee(obj).subscribe((dt:any)=>{
        console.log(dt);
        if(dt.id>0){
          this.routes.navigate(['employeelist'],{ queryParams: { id:dt.id }});
        }
       
      })
    } 
  }
Cancel(){
  this.routes.navigate(['employee']);
}
  
  picked(event, field,file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    this.currentId = field;
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
    let id = this.currentId;
        this.sellersPermitString = base64result;
       

    // this.log();
  }
 
}
