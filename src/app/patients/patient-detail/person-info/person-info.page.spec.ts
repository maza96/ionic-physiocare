import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonInfoPage } from './person-info.page';

describe('PersonInfoPage', () => {
  let component: PersonInfoPage;
  let fixture: ComponentFixture<PersonInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
