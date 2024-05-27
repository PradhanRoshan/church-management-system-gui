import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalRegistrationComponent } from './internal-registration.component';

describe('InternalRegistrationComponent', () => {
  let component: InternalRegistrationComponent;
  let fixture: ComponentFixture<InternalRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
