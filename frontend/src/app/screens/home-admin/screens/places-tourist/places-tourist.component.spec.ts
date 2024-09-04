import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesTouristComponent } from './places-tourist.component';

describe('PlacesTouristComponent', () => {
  let component: PlacesTouristComponent;
  let fixture: ComponentFixture<PlacesTouristComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacesTouristComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesTouristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
