import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { HeaderComponent } from './header/header.component';
 
 

const routes: Routes = [
  {path:'',redirectTo:'employee',pathMatch:'full'},  
  {path:'employee',component:EmployeeComponent},
  {path:'addemployee',component:AddemployeeComponent},
  {path:'editemployee',component:EditemployeeComponent},
  {path:'employeelist',component:EmployeelistComponent},
   {path:'**',redirectTo:'employee'}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
