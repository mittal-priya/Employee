import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  role:any;
  user:any;
  pass: any;
  res: any;
  constructor(private router: Router, private data: DataService) {}
  onClick(){
    let json = {user: this.user, password: this.pass, role: this.role};
    this.data.login(json);   
  }
}
