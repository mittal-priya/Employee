import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loginData = [{user: 'priya', password: '12345', role: 'Employee'},
  {user: 'ram', password: '12345', role: 'Manager'}];
  listdata = [{empid: '1100', empname:"priya", projectname:'Demo1', rating: 4,comments:"nice project", mgrrating:3,mgrcomment:'thank you'}];
  loop:any=[];
  editData: any;
  constructor( private router : Router, private storage: Storage) { 
    this.storage.set('login', this.loginData);
    this.storage.set('list', this.listdata);
  }

   login(json){
    this.storage.get('login').then((data) => {
      this.loop = data
      this.loop.forEach(element => {
        if(element.user == json.user && element.password == json.password && element.role == json.role){
          if(json.role=="Employee"){
            this.router.navigate(['/employee']);
            }else if(json.role == "Manager"){
            this.router.navigate(['/manager']);
            }
        }else{
          alert("username and password don't match")
        }
    });
     })
        
   }
edit(json){
this.editData = json;
}
getEdit(){
  return this.editData;
}
}
