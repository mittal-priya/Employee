import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerPageRoutingModule } from './manager-routing.module';

import { ManagerPage } from './manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ManagerPageRoutingModule
  ],
  declarations: [ManagerPage]
})
export class ManagerPageModule {}
