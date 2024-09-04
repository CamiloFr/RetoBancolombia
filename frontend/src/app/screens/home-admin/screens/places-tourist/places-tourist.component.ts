import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeAdminService } from '../../services/home-admin.service';
import { PlacesTourist } from '../../../../models/places-tourist.model';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { UtilsService } from '../../../utils/utils.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { SharedFacade } from '../../../../state/shared.facade';
import { Observable } from 'rxjs';
import { NumberRoundPipe } from '../../pipes/number.pipe';

@Component({
  selector: 'app-places-tourist',
  standalone: true,
  imports: [
    NavbarComponent,
    HttpClientModule,
    CommonModule,
    BreadcrumbComponent,
    FooterComponent,
    LoadingComponent,
    NumberRoundPipe,
  ],
  providers: [HomeAdminService],
  templateUrl: './places-tourist.component.html',
  styleUrl: './places-tourist.component.scss',
})
export class PlacesTouristComponent {
  placesTourist: PlacesTourist[];
  actualPage: number;
  registerPerPage: number;
  totalRegisters: number;
  totalPages: number;
  isLoading$: Observable<boolean>;
  textEllipsis: boolean;

  constructor(
    private homeAdminService: HomeAdminService,
    public utils: UtilsService,
    private sharedFacade: SharedFacade
  ) {
    this.textEllipsis = false;
    this.placesTourist = [];
    this.actualPage = 1;
    this.registerPerPage = 10;
    this.totalRegisters = 10;
    this.totalPages = 1;
    this.isLoading$ = this.sharedFacade.appLoading$;
  }

  ngOnInit(): void {
    this.callInformationOfPlacesTourist();
  }

  callInformationOfPlacesTourist() {
    this.sharedFacade.setLoading(true);
    this.homeAdminService
      .getPlacesTourist(this.actualPage, this.registerPerPage)
      .subscribe((res: any) => {
        this.totalRegisters = res.totalRecords;
        this.placesTourist = res.data;
        this.totalPages = Math.ceil(this.totalRegisters / this.registerPerPage);
        this.sharedFacade.setLoading(false);
      });
  }

  nextPage() {
    if (this.actualPage > this.totalRegisters / this.registerPerPage) {
      return;
    }
    this.actualPage++;
    this.callInformationOfPlacesTourist();
  }

  previousPage() {
    if (this.actualPage === 1) {
      return;
    }
    this.actualPage--;
    this.callInformationOfPlacesTourist();
  }
}
