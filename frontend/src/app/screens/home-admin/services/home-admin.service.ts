import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HomeAdminService {
    constructor(private http: HttpClient) { }

    getInformationBasicColombia() {
        return this.http.get('https://api-colombia.com/api/v1/Country/Colombia');
    }

    getPlacesNatural(page: string, pageSize: string) {
        return this.http.get('https://api-colombia.com/api/v1/NaturalArea/pagedList', { params: { Page: page, PageSize: pageSize } });
    }

    getPlacesTourist(page: number, pageSize: number) {
        return this.http.get('https://api-colombia.com/api/v1/TouristicAttraction/pagedList', { params: { Page: page, PageSize: pageSize } });
    }

    getCategoryNaturalArea() {
        return this.http.get('https://api-colombia.com/api/v1/CategoryNaturalArea');
    }

    getPlacesNaturalById(id: string) {
        return this.http.get(`https://api-colombia.com/api/v1/CategoryNaturalArea/${id}/NaturalAreas`);
    }
}