import { Component } from '@angular/core';
import { UtilsService } from '../../utils/utils.service';
import { SharedFacade } from '../../../state/shared.facade';
import { UserResponse } from '../../../models/user.model';
import { initialUserInformation } from '../../../state/reducers/app.reducer';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  providers: [SharedFacade],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  userInfo: UserResponse;

  constructor(
    public utilsService: UtilsService,
    private sharedFacade: SharedFacade,
    private router: Router
  ) {
    this.userInfo = initialUserInformation;
  }

  ngOnInit(): void {
    this.sharedFacade.appUserInformation$.subscribe((res: any) => {
      // if (res.email === '' && this.router.url !== '/') {
      //   return this.utilsService.navigateTo('/login');
      // }
      this.userInfo = res;
    });
  }

  logout() {
    this.sharedFacade.setUserInformation(initialUserInformation);
    this.utilsService.navigateTo('/login');
  }
}
