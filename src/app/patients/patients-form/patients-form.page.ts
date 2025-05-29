import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, NavController, IonRouterLink, IonNote, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonIcon, IonButton, IonImg, IonGrid, IonRow, IonCol, IonInput, IonLabel } from '@ionic/angular/standalone';
import { Patient } from '../interfaces/patient';
import { PatientsService } from '../services/patients.service';
import { RouterLink } from '@angular/router';
import { OlMapDirective } from 'src/app/directives/ol-maps/ol-map.directive';
import { OlMarkerDirective } from 'src/app/directives/ol-maps/ol-marker.directive';
import { SearchResult } from 'src/app/directives/ol-maps/search-result';
import { GaAutocompleteDirective } from 'src/app/directives/ol-maps/ga-autocomplete.directive';
//import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-patients-form',
  templateUrl: './patients-form.page.html',
  styleUrls: ['./patients-form.page.scss'],
  standalone: true,
  imports: [FormsModule, GaAutocompleteDirective, OlMapDirective, OlMarkerDirective, RouterLink, IonRouterLink, IonHeader, IonNote, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonInput]
})
export class PatientsFormPage {

  newPatient: Patient = {
    name: '',
    surname: '',
    birthDate: '',
    address: '',
    email: '',
    insuranceNumber: ''
  }
  coordinates = signal<[number, number]>([0, 0]);
  address = signal<string>('');

  #patientsService = inject(PatientsService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController);
  #changeDetector = inject(ChangeDetectorRef);

  addPatient() {
    this.#patientsService.addPatient(this.newPatient).subscribe({
      next: async pat => {
        (await this.#toastCtrl.create({
          position: 'bottom',
          duration: 3000,
          message: 'Patient added succesfully',
          color: 'success'
        })).present();
        this.#nav.navigateRoot(['/patients']);
      },
      error: async error => (await this.#toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Error adding product'
      })).present()
    });
  }

  changePlace(result: SearchResult) {
    this.coordinates.set(result.coordinates);
    this.address.set(result.address);
    this.newPatient.address = result.address;
    console.log('Dirección:', this.address());
    console.log('Coordenadas:', this.coordinates());
  }

  // async takePhoto() {;
  //   const photo = await Camera.getPhoto({
  //     source: CameraSource.Camera,
  //     quality: 90,
  //     height: 640,
  //     width: 640,
  //     // allowEditing: true,
  //     resultType: CameraResultType.DataUrl // Base64 (url encoded)
  //   });

  //   this.newProd.imageUrl = photo.dataUrl as string;
  //   this.#changeDetector.markForCheck();
  // }

  // async pickFromGallery() {
  //   const photo = await Camera.getPhoto({
  //     source: CameraSource.Photos,
  //     height: 640,
  //     width: 640,
  //     // allowEditing: true,
  //     resultType: CameraResultType.DataUrl // Base64 (url encoded)
  //   });

  //   this.newProd.imageUrl = photo.dataUrl as string;
  //   this.#changeDetector.markForCheck();
  // }
}
