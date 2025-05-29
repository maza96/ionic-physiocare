
import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Platform, IonApp, IonImg, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonAvatar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, medkitOutline, navigate, image, calendar, card, people, document, location, personAdd, arrowUndoCircle, camera, chatboxEllipses, checkmarkCircle, close, documentText, exit, eye, home, images, informationCircle, logIn, menu, trash, medkit } from 'ionicons/icons';
import { User } from './auth/interfaces/user';
import { AuthService } from './auth/services/auth.service';
import { NavController, ToastController } from '@ionic/angular';

import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonAvatar, IonImg, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  user = signal<User | null>(null);

  #authService = inject(AuthService);
  #platform = inject(Platform);
  #nav = inject(NavController);
  #toast = inject(ToastController);

  public appPages = [
    { title: 'Patients', url: '/patients', icon: 'people' },
    { title: 'Add Patient', url: '/patients/add', icon: 'person-add' },
    { title: 'Physios', url: '/physios', icon: 'people' },
    { title: 'Add Physio', url: '/physios/add', icon: 'person-add' },
  ];
  constructor() {
    addIcons({ exit, medkitOutline, calendar, navigate, card, image, document, location, people, personAdd, logIn, documentText, checkmarkCircle, images, camera, arrowUndoCircle, menu, add, close, eye, trash, informationCircle, chatboxEllipses });
    effect(() => {
    if (this.#authService.logged()) {
      this.#authService.getProfile().subscribe((user) => {
        console.log('[AppComponent] Perfil obtenido:', user);
        this.user.set(user);
      });
    } else {
      console.log('[AppComponent] Usuario no logueado');
      this.user.set(null);
    }
  });

    this.initializeApp();
  }

  async initializeApp() {
    if (this.#platform.is('capacitor')) {
      await this.#platform.ready();
      SplashScreen.hide();
    }
  }

  async logout() {
    await this.#authService.logout();
    this.#nav.navigateRoot(['/auth/login']);
  }
}
