export interface PlacesNatural {
  id: string;
  name: string;
  areaGroupId: number;
  categoryNaturalAreaId: number;
  daneCode: number;
  departmentId: number;
  landArea: number;
  maritimeArea: number;
  categoryNaturalArea: any;
}

export interface CategoryNaturalArea {
  id: number;
  name: string;
  description: string;
  naturalAreas: any;
}

export interface NaturalAreasByCategory {
  id: number;
  name: string;
  areaGroupId: number;
  categoryNaturalAreaId: number;
  daneCode: number;
  departmentId: number;
  landArea: number;
  maritimeArea: number;
  department: {
    id: number;
    name: string;
    description: string;
    cityCapitalId: number;
    municipalities: number;
    surface: number;
    population: number;
    phonePrefix: string;
    countryId: number;
    categoryNaturalArea: any;
  };
  categoryNaturalArea: any;
}