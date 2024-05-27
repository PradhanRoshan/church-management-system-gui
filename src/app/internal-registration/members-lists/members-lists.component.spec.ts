import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersListsComponent } from './members-lists.component';

describe('MembersListsComponent', () => {
  let component: MembersListsComponent;
  let fixture: ComponentFixture<MembersListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
