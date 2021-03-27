import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Student, StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.page.html',
  styleUrls: ['./student-modal.page.scss'],
})
export class StudentModalPage implements OnInit {
  @Input() student: Student;
  isUpdate = false;

  //Data to be Updated
  data = {
    name: '',
    address: '',
    phone: ''
  };

  constructor(private modalCtrl: ModalController,
              private service: StudentService
  ) { }

  ngOnInit() {
    if(this.student) {
      //If student is not null it means modal is on update mode
      this.isUpdate = true;
      this.data = this.student;
    }
    // console.log(this.student);
  }

  closeModal() {
    this.modalCtrl.dismiss(null, 'Closed');
  }

  onSubmit(form: NgForm) {
    const student = form.value;

    if(this.isUpdate) {
      this.service.update(student, this.student.id).subscribe(() => {
        //append id to the Updated student object
        student.id = this.student.id;
        this.modalCtrl.dismiss(student, 'Updated');
      });

    } else {
    this.service.create(student).subscribe(response => {

      // Pass data and close Modal
      this.modalCtrl.dismiss(response, 'Created')
    });
    // console.log(form.value);
    }
  }
}
