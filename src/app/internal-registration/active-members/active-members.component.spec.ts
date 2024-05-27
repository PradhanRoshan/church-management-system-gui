import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMembersComponent } from './active-members.component';

describe('ActiveMembersComponent', () => {
  let component: ActiveMembersComponent;
  let fixture: ComponentFixture<ActiveMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
