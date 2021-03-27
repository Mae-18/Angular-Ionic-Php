import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Student, StudentService } from '../services/student.service';
import { StudentModalPage } from '../student-modal/student-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  students: Student[];
  constructor(private service: StudentService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController
              ) {}

  ngOnInit() {
    this.service.getAll().subscribe(response=> {
      console.log(response);
      this.students = response;
    })
  }

  addStudent() {
    this.modalCtrl.create({
      component: StudentModalPage
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
    .then(({data, role}) => {
      if(role === 'Created'){
        this.students.push(data);
      }
    });
  }

  updateStudent(student: Student) {
    this.modalCtrl.create({
      component: StudentModalPage,
      componentProps: { student } //Shothand of {student:student}
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role}) => {
      this.students = this.students.filter(std => {
        if(data.id === std.id) {
          //Return updated data
          return data;
        }
        return std;
      })
    });
    // console.log(student);
  }

  removeStudent(id: string) {
    this.alertCtrl.create({
      header: 'Delete !',
      message: 'Are you sure you want to Delete?',
      buttons: [
        {
          text: 'Yes',
          handler:()=> {
            this.service.remove(id).subscribe(()=> {
              this.students = this.students.filter(str => str.id != id)
            })
          }
        },
        {text: 'No' }
      ]
    }).then(alertEl => alertEl.present())
  }

}
