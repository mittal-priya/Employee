import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataService } from '../data.service';
import { EditPage } from '../edit/edit.page';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.page.html',
  styleUrls: ['./manager.page.scss'],
})
export class ManagerPage implements OnInit {
  loop:any=[];
  constructor(private storage: Storage, private data: DataService, public modalController: ModalController) { }

  ngOnInit() {
    this.getList();
  }
  getList(){
    this.storage.get('list').then((data) =>
     {
       this.loop = data;
       },
     error=> console.log(error)
     )
     
 }
 async edit(data){
  this.data.edit(data);
  this.loop.pop(data);
     this.storage.set('list',this.loop);
     const modal = await this.modalController.create({
       component: EditPage});
       modal.onDidDismiss().then(data=>{
         console.log(data)
         this.getList();
         })
       return await  modal.present();

 //  this.router.navigate(['/employee-edit']);
}

del(data){
  console.log('hi')
  this.loop.forEach(element => {
    if(element.empid == data.empid){
      this.loop.pop(data);
      this.storage.set('list',this.loop);
    }
  });
}
  
}
