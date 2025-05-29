import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, NavController, IonCol, IonGrid, IonRow, IonList ,IonHeader, IonToolbar, IonContent, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonLabel, IonItem, IonAvatar } from '@ionic/angular/standalone';
import { PatientDetailPage } from 'src/app/patients/patient-detail/patient-detail.page';
import { PatientsService } from 'src/app/patients/services/patients.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.page.html',
  styleUrls: ['./person-info.page.scss'],
  standalone: true,
  imports: [CommonModule, IonCol, IonGrid, IonRow, IonHeader, IonList, IonToolbar, IonContent, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonButton, IonIcon, IonLabel, IonItem],
})
export class PersonInfoPage {
  record = inject(PatientDetailPage).record;

  #alertCtrl = inject(AlertController);
  #patientsService = inject(PatientsService);
  #nav = inject(NavController);
  #authService = inject(AuthService);

  get isAdmin() {
    return this.#authService.rol() === 'admin';
  }

  async delete() {
    const alert = await this.#alertCtrl.create({
      header: 'Delete patient',
      message: 'Are you sure you want to delete this patient?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.#patientsService
              .deletePatient(this.record()!.patient._id!)
              .subscribe(() => this.#nav.navigateBack(['/patients']));
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    alert.present();
  }
}
