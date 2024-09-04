import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { HomeAdminService } from '../../services/home-admin.service';
import { HttpClientModule } from '@angular/common/http';
import {
  CategoryNaturalArea,
  PlacesNatural,
} from '../../../../models/places-natural.model';
import { CommonModule } from '@angular/common';
import { NaturalAreasByCategory } from '../../../../models/places-natural.model';
import { FooterComponent } from '../../../components/footer/footer.component';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { UtilsService } from '../../../utils/utils.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { SharedFacade } from '../../../../state/shared.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-places-natural',
  standalone: true,
  imports: [
    NavbarComponent,
    HttpClientModule,
    CommonModule,
    FooterComponent,
    BreadcrumbComponent,
    LoadingComponent,
  ],
  providers: [HomeAdminService],
  templateUrl: './places-natural.component.html',
  styleUrl: './places-natural.component.scss',
})
export class PlacesNaturalComponent {
  placesNatural: PlacesNatural[];
  categoryNatualArea: CategoryNaturalArea[];
  naturalAreasByCategory: NaturalAreasByCategory[];
  categorySelected: string;
  isLoading$: Observable<boolean>;
  textEllipsis: boolean;

  constructor(
    private homeAdminService: HomeAdminService,
    public utils: UtilsService,
    private sharedFacade: SharedFacade
  ) {
    this.textEllipsis = false;
    this.placesNatural = [];
    this.categoryNatualArea = [];
    this.naturalAreasByCategory = [];
    this.categorySelected = '';
    this.isLoading$ = this.sharedFacade.appLoading$;
  }

  ngOnInit(): void {
    this.callCategoriesToSelectPlacesNatural();
    this.callInformationOfPlacesNatural();
  }

  callCategoriesToSelectPlacesNatural() {
    this.sharedFacade.setLoading(true);
    this.homeAdminService.getCategoryNaturalArea().subscribe((res: any) => {
      this.sharedFacade.setLoading(false);
      this.categoryNatualArea = res;
    });
  }

  callInformationOfPlacesNatural() {
    this.sharedFacade.setLoading(true);
    this.homeAdminService.getPlacesNatural('1', '10').subscribe((res: any) => {
      this.sharedFacade.setLoading(false);
      this.placesNatural = res.data;
    });
  }

  callPlacesNaturalByCategory() {
    this.sharedFacade.setLoading(true);
    this.homeAdminService
      .getPlacesNaturalById(this.categorySelected)
      .subscribe((res: any) => {
        this.sharedFacade.setLoading(false);
        this.naturalAreasByCategory = res.naturalAreas;
      });
  }

  clickOnCategory(category: number) {
    this.categorySelected = category.toString();
    this.callPlacesNaturalByCategory();
  }
}
