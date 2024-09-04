import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesNaturalComponent } from './places-natural.component';

describe('PlacesNaturalComponent', () => {
  let component: PlacesNaturalComponent;
  let fixture: ComponentFixture<PlacesNaturalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacesNaturalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesNaturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
