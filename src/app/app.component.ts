
import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Platform, IonApp, IonImg, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonAvatar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowUndoCircle, camera, checkmarkCircle, documentText, home, images, logIn } from 'ionicons/icons';
import { User } from './auth/interfaces/user';
import { AuthService } from './auth/services/auth.service';
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
  // #nav = inject(NavController);
  // #toast = inject(ToastController);

  public appPages = [
    { title: 'Home', url: '/patients', icon: 'home' },
  ];
  constructor() {
    addIcons({ home, logIn, documentText, checkmarkCircle, images, camera, arrowUndoCircle });
    effect(() => {
      if (this.#authService.logged()) {
        this.#authService.getProfile().subscribe((user) => (this.user.set(user)));
      } else {
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
}
