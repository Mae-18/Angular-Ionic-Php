import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentModalPage } from './student-modal.page';

const routes: Routes = [
  {
    path: '',
    component: StudentModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentModalPageRoutingModule {}
