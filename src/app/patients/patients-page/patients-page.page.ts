import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavController, ActionSheetController, IonSearchbar, IonImg, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonThumbnail,IonLabel, IonButton } from '@ionic/angular/standalone';
import { Patient } from '../interfaces/patient';
import { PatientsService } from '../services/patients.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-patients-page',
  templateUrl: './patients-page.page.html',
  styleUrls: ['./patients-page.page.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink, IonSearchbar, IonImg, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonThumbnail, IonLabel, IonButton]
})
export class PatientsPagePage {

  patients = signal<Patient[]>([]);
  searchTerm = '';
  filteredPatients = signal<Patient[]>([]);

  #patientsService = inject(PatientsService);
  #navController = inject(NavController);
  #actionSheetCtrl = inject(ActionSheetController);
  #authService = inject(AuthService);

  ionViewWillEnter() {
    this.reloadPatients();
  }

  reloadPatients(refresher?: IonRefresher) {
    this.#patientsService.getPatients().subscribe({
      next: (patients) => {
        this.patients.set(patients);
        this.filterPatientsByNameAndSurname();
        refresher?.complete();
      },
      error: (err) => {
        console.error('Error loading patients:', err);
        refresher?.complete();
      }
    });
  }

  get isAdmin() {
    return this.#authService.rol() === 'admin';
  }

  async showOptions(patient: Patient) {
    const buttons: any[] = [
      {
        text: 'View Details',
        icon: 'eye',
        handler: () => {
          this.#navController.navigateForward(['patients', patient._id]);
        }
      }
    ];

    if (this.isAdmin) {
      buttons.push({
        text: 'Delete Patient',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.#patientsService
            .deletePatient(patient._id!)
            .subscribe(() =>
              this.patients.update((currentPatients) =>
                currentPatients.filter((p) => p._id !== patient._id))
            );
        }
      });
    }

    buttons.push({
      text: 'Cancel',
      icon: 'close',
      role: 'cancel'
    });

    const actionSheet = await this.#actionSheetCtrl.create({
      header: 'Patient Options',
      buttons
    });
    actionSheet.present();
  }

  filterPatientsByNameAndSurname() {
    if (this.searchTerm.trim() === '') {
      this.filteredPatients.set(this.patients());
    } else {
      this.searchTerm = this.searchTerm.trim().toLowerCase();
      this.filteredPatients.set(this.patients().filter(patient =>
        patient.name.toLowerCase().includes(this.searchTerm) ||
        patient.surname.toLowerCase().includes(this.searchTerm)
      ));
    }
  }
}
