import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpserviceService } from '../service/empservice.service';
import { DomSanitizer } from '@angular/platform-browser';
import{Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
  myForm:FormGroup;
  emprecord:any;
  empdet:any;
  img:any;
  currentId: number = 0;
  sellersPermitFile: any;
  sellersPermitString: string;
  constructor(private ar:ActivatedRoute,private _sanitizer: DomSanitizer,private routes:Router,private empservice:EmpserviceService) { 
  
  }

  ngOnInit() {
  
    
     this.empgetdetails();
  }
  
   empgetdetails(){
    this.empdet=this.ar.snapshot.queryParamMap.get('id')
        
    this.empservice.getEmployeebyid(this.empdet).subscribe((dt:any)=>{
      this.emprecord=dt;
      this.img = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
                 +this.emprecord.upload);
       
       
    })
   }

  editRecord(id){
  
  this.routes.navigate(['editemployee'],{ queryParams: { id:id }});
  
  }
  Cancel(){
    this.routes.navigate(['employee']);
  }
  deleteRecord(id){
    this.empservice.deleteEmployee(id).subscribe((dt:any)=>{
      console.log(dt);
        this.routes.navigate(['employee'])
    })
  }



}
