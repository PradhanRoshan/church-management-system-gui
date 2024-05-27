import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitheOfferingComponent } from './tithe-offering.component';

describe('TitheOfferingComponent', () => {
  let component: TitheOfferingComponent;
  let fixture: ComponentFixture<TitheOfferingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitheOfferingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitheOfferingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
