import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentModalPageRoutingModule } from './student-modal-routing.module';

import { StudentModalPage } from './student-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentModalPageRoutingModule
  ],
  declarations: [StudentModalPage]
})
export class StudentModalPageModule {}
