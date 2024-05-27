import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersRegistrationComponent } from './members-registration.component';

describe('MembersRegistrationComponent', () => {
  let component: MembersRegistrationComponent;
  let fixture: ComponentFixture<MembersRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
