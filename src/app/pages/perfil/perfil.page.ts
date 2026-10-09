import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonText, 
  IonAvatar, 
  IonIcon, 
  IonButton 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { person } from 'ionicons/icons';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonText, 
    IonAvatar, 
    IonIcon, 
    IonButton
  ]
})
export class PerfilPage {
  constructor() {
    addIcons({ person });
  }
}