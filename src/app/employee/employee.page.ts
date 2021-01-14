import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';
import { ngfactoryFilePath } from '@angular/compiler/src/aot/util';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EmployeeEditPage } from '../employee-edit/employee-edit.page';
enum COLORS{
  GREY = '#E0E0E0',
  GREEN="#76FF03",
  YELLOW= "#FFCA28",
  RED ="#DD2C00"
}
  
@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
  
})
export class EmployeePage implements OnInit {
  show = 'feedback';
  EmpName:any;
  EmpId: any;
  Project: any;
  loop:any=[];
  myStyles = { showUsername: false };

  @Input() rating: number ;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private data: DataService,private storage: Storage,private router: Router, public modalController: ModalController) {
    
   }
  authForm: FormGroup;
  ngOnInit() {
    this.initializeForm();
    
  }
  ionViewWillEnter(){
    this.getList();
  }
    segmentChanged(ev: any) {
      console.log( ev.detail.value);
      this.show = ev.detail.value;
    }
    initializeForm() {
      this.authForm = this.formBuilder.group({
        customer_group_id: 1,
        name: [null, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(1)])],
        EmpId: [null, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(1)])],
        Project: [null, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(1)])],
        comment:[null, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(1)])]
      });
    }

    rate(index: number) {
        this.rating = index;
        this.ratingChange.emit(this.rating);
     }
  
    getColor(index: number) {
       if(this.isAboveRating(index)){
         return COLORS.GREY;
       }
       switch (this.rating){
         case 1 :
           case 2:
             return COLORS.RED;
             case 3: 
            return COLORS.YELLOW;
          case 4:
            case 5:
              return COLORS.GREEN;
            default:
              return COLORS.GREY
                   }
      }
  
    isAboveRating(index: number): boolean {
      return index > this.rating;
    }
    getList(){
      this.storage.get('list').then((data) =>
       {
         this.loop = data;
         },
       error=> console.log(error)
       )
       
   }
    insertList(){
      let json={empid: this.authForm.value.EmpId, 
      empname:this.authForm.value.name,
       projectname:this.authForm.value.Project, 
       rating: this.rating,
       comments:this.authForm.value.comment, 
       mgrrating:null,
       mgrcomment:null}
      this.storage.get('list').then((data) =>{
       this.loop = data
       this.loop.push(json);
       this.storage.set('list',this.loop);},
       error=> console.log(error)
       )
       alert('Data inserted');
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
    async edit(data){
       this.data.edit(data);
       this.loop.pop(data);
          this.storage.set('list',this.loop);
          const modal = await this.modalController.create({
            component: EmployeeEditPage});
            modal.onDidDismiss().then(data=>{
              console.log(data)
              this.getList();
              })
            return await  modal.present();

      //  this.router.navigate(['/employee-edit']);
     }

}
