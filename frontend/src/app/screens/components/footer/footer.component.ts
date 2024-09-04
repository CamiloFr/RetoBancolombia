import { Component } from '@angular/core';
import { bootstrapFacebook, bootstrapInstagram, bootstrapX } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  viewProviders: [
    provideIcons({ bootstrapX, bootstrapFacebook, bootstrapInstagram }),
  ],
})
export class FooterComponent {

}
