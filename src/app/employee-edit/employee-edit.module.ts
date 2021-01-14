import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeEditPageRoutingModule } from './employee-edit-routing.module';

import { EmployeeEditPage } from './employee-edit.page';
import { IonicInputDirective } from '../ionic-input.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EmployeeEditPageRoutingModule
  ],
  declarations: [EmployeeEditPage]
})
export class EmployeeEditPageModule {}
