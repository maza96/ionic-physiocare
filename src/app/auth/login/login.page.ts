import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonButton, IonIcon]
})
export class LoginPage {
  email = '';
  password = '';

  #authService = inject(AuthService);
  #alertCtrl = inject(AlertController);
  #navCtrl = inject(NavController);
  #platform = inject(Platform);

  constructor() {}

  async login() {
    try {
      await this.#authService.login(this.email, this.password);
      const rol = this.#authService.rol();
      if (rol === 'admin') {
        this.#navCtrl.navigateRoot(['/patients']);
      } else if (rol === 'patient' || rol === 'physio') {
        this.#navCtrl.navigateRoot(['/physios']);
      }
    } catch {
      (await this.#alertCtrl.create({
        header: 'Login error',
        message: 'Incorrect email and/or password',
        buttons: ['Ok'],
      })).present();
    }
  }
}
