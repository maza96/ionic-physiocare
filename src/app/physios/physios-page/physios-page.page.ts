import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavController, ActionSheetController, IonSearchbar, IonImg, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonThumbnail,IonLabel, IonButton } from '@ionic/angular/standalone';
import { PhysiosService } from '../services/physios.service';
import { AuthService } from '../../auth/services/auth.service';
import { Physio } from '../interfaces/physio';

@Component({
  selector: 'app-physios-page',
  templateUrl: './physios-page.page.html',
  styleUrls: ['./physios-page.page.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink, IonSearchbar, IonImg, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonThumbnail, IonLabel, IonButton]
})
export class PhysiosPagePage {

  physios = signal<Physio[]>([]);
  searchTerm = '';
  filteredPhysios = signal<Physio[]>([]);

  #physiosService = inject(PhysiosService);
  #navController = inject(NavController);
  #actionSheetCtrl = inject(ActionSheetController);
  #authService = inject(AuthService);

  ionViewWillEnter() {
    this.reloadPhysios();
  }

  reloadPhysios(refresher?: IonRefresher) {
    this.#physiosService.getPhysios().subscribe({
      next: (physios) => {
        this.physios.set(physios);
        this.filterPhysiosByNameAndSurname();
        refresher?.complete();
      },
      error: (err) => {
        console.error('Error loading physios:', err);
        refresher?.complete();
      }
    });
  }

  get isAdmin() {
    return this.#authService.rol() === 'admin';
  }

  async showOptions(physio: Physio) {
    const buttons: any[] = [
      {
        text: 'View Details',
        icon: 'eye',
        handler: () => {
          this.#navController.navigateForward(['/physios/profile', physio._id]);
        }
      }
    ];

    if (this.isAdmin) {
      buttons.push({
        text: 'Delete Physio',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.#physiosService
            .deletePhysio(physio._id!)
            .subscribe(() => {
              this.physios.update((currentPhysios) =>
                currentPhysios.filter((p) => p._id !== physio._id)
              );
              this.filterPhysiosByNameAndSurname();
            });
        }
      });
    }

    buttons.push({
      text: 'Cancel',
      icon: 'close',
      role: 'cancel'
    });

    const actionSheet = await this.#actionSheetCtrl.create({
      header: 'Physio Options',
      buttons
    });
    actionSheet.present();
  }

  filterPhysiosByNameAndSurname() {
    const physiosArr = this.physios();
    console.log('physios signal value:', physiosArr, Array.isArray(physiosArr));
    if (this.searchTerm.trim() === '') {
      this.filteredPhysios.set(physiosArr ?? []);
    } else {
      this.searchTerm = this.searchTerm.trim().toLowerCase();
      this.filteredPhysios.set((physiosArr ?? []).filter(physio =>
        physio.name.toLowerCase().includes(this.searchTerm) ||
        (physio.surname?.toLowerCase().includes(this.searchTerm) ?? false)
      ));
    }
  }
}
