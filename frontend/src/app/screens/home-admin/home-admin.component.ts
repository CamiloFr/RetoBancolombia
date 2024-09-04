import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HomeAdminService } from './services/home-admin.service';
import { HttpClientModule } from '@angular/common/http';
import { Colombian } from '../../models/colombian.model';
import { RouterOutlet } from '@angular/router';
import { UtilsService } from '../utils/utils.service';
import { FooterComponent } from '../components/footer/footer.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../components/loading/loading.component";
import { SharedFacade } from '../../state/shared.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss',
  providers: [
    HomeAdminService,
    SharedFacade
  ],
  imports: [
    NavbarComponent,
    FooterComponent,
    HttpClientModule,
    RouterOutlet,
    BreadcrumbComponent,
    CommonModule,
    LoadingComponent
],
})
export class HomeAdminComponent {
  basicInformation: Colombian;
  isLoading$: Observable<boolean>;

  constructor(
    private homeAdminService: HomeAdminService,
    public utils: UtilsService,
    private sharedFacade: SharedFacade
  ) {
    this.isLoading$ = this.sharedFacade.appLoading$;
    this.basicInformation = {} as Colombian;
  }

  ngOnInit(): void {
    this.callInformationOfColombia();
  }

  callInformationOfColombia() {
    this.sharedFacade.setLoading(true);
    this.homeAdminService
      .getInformationBasicColombia()
      .subscribe((res: any) => {
        const data: Colombian = {
          name: res['name'],
          borders: res['borders'],
          stateCapital: res['stateCapital'],
          subRegion: res['subRegion'],
          languages: res['languages'],
          currency: res['currency'],
          region: res['region'],
          description: res['description'],
          flags: res['flags'],
        };
        this.basicInformation = data;
        this.sharedFacade.setLoading(false);
      });
  }
}
