import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataService } from '../data.service';
enum COLORS{
  GREY = '#E0E0E0',
  GREEN="#76FF03",
  YELLOW= "#FFCA28",
  RED ="#DD2C00"
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  show = 'feedback';
  EmpName:any;
  EmpId: any;
  Project: any;
  loop:any=[];
  myStyles = { showUsername: false };

  @Input() rating: number ;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private data: DataService,private storage: Storage, private router: Router, public viewCtrl: ModalController) {

   }
  authForm: FormGroup;
  ngOnInit() {
    this.loop = this.data.getEdit();
    this.initializeForm();
    
    console.log(this.loop)
  }
    initializeForm() {
      this.authForm = this.formBuilder.group({
        customer_group_id: 1,
        name: [this.loop.empname, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(1)])],
        EmpId: [this.loop.empid, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(1)])],
        Project: [this.loop.projectname, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(1)])],
        comment:[this.loop.comments, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(1)])],
        mgrcomment:[null, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(1)])]
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
    insertList(){
      let json={empid: this.authForm.value.EmpId, 
      empname:this.authForm.value.name,
       projectname:this.authForm.value.Project, 
       rating: this.loop.rating,
       comments:this.authForm.value.comment, 
       mgrrating:this.rating,
       mgrcomment:this.authForm.value.mgrcomment}
      this.storage.get('list').then((data) =>{
       this.loop = data
       this.loop.push(json);
       this.storage.set('list',this.loop);},
       error=> console.log(error)
       )
       this.viewCtrl.dismiss();
       
    }

}
