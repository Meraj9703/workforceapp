import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpserviceService {
 
  constructor(private http:HttpClient) { }

     getEployee():Observable<any>{
       return this.http.get('http://localhost:3000/users')
      
     }

    getEmployeebyid(id:number){
      return this.http.get("http://localhost:3000/users/"+id)
     }

     postEmployee(obj):Observable<any>{
       return this.http.post( "http://localhost:3000/users/",obj)
     }

     editEmployee(id,obj):Observable<any>{
       return this.http.put("http://localhost:3000/users/"+id,obj)
     }

     deleteEmployee(id):Observable<any>{
      return this.http.delete("http://localhost:3000/users/"+id)
     }
      
    }

