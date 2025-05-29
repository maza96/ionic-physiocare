import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, IonButtons, IonMenuButton, NavController, IonHeader, IonTitle, IonToolbar, IonContent, IonList, IonItem, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonInput, IonSelect, IonSelectOption, IonNote } from '@ionic/angular/standalone';
import { PhysiosService } from '../services/physios.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-physios-form',
  templateUrl: './physios-form.page.html',
  styleUrls: ['./physios-form.page.scss'],
  standalone: true,
  imports: [FormsModule, IonButtons, IonMenuButton, RouterLink, IonHeader, IonNote, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonInput, IonSelect, IonSelectOption, CommonModule]
})
export class PhysiosFormPage {

  newPhysio = {
    name: '',
    surname: '',
    email: '',
    specialty: '',
    licenseNumber: '',
    imagen: ''
  };

  #physiosService = inject(PhysiosService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController);

  addPhysio() {
    this.#physiosService.addPhysio(this.newPhysio).subscribe({
      next: async physio => {
        (await this.#toastCtrl.create({
          position: 'bottom',
          duration: 3000,
          message: 'Physio added successfully',
          color: 'success'
        })).present();
        this.#nav.navigateRoot(['/physios']);
      },
      error: async error => (await this.#toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Error adding physio'
      })).present()
    });
  }
}
