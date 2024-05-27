import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundTypesComponent } from './fund-types.component';

describe('FundTypesComponent', () => {
  let component: FundTypesComponent;
  let fixture: ComponentFixture<FundTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
