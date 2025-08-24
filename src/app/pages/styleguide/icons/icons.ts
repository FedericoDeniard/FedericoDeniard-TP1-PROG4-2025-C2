import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherHome, featherTrash, featherX, featherCheckCircle, featherAlertTriangle, featherInfo, featherLink, featherUsers, featherSettings, featherMail } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './icons.html',
  styleUrl: './icons.css',
  viewProviders: [provideIcons({ featherHome, featherTrash, featherX, featherCheckCircle, featherAlertTriangle, featherInfo, featherLink, featherUsers, featherSettings, featherMail })]
})
export class Icons {

}
