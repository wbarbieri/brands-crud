import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  postBrand(data : any){
    return this.http.post<any>("http://localhost:3000/brandList/", data);
  }
  getBrand(){
    return this.http.get<any>("http://localhost:3000/brandList/");
  }
  putBrand(data:any, id: number){
    return this.http.put<any>("http://localhost:3000/brandList/" +id, data);
  }
  deleteBrand(id:number){
    return this.http.delete<any>("http://localhost:3000/brandList/"+id);
  }
}
