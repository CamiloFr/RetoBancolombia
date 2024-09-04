import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { UtilsService } from '../utils/utils.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapX,
  bootstrapInstagram,
  bootstrapFacebook,
} from '@ng-icons/bootstrap-icons';

@Component({
  standalone: true,
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  imports: [NavbarComponent, FooterComponent, NgIconComponent],
  viewProviders: [
    provideIcons({ bootstrapX, bootstrapFacebook, bootstrapInstagram }),
  ],
})
export class HomeComponent {
  constructor(public utils: UtilsService) {}
}
