import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsPagePage } from './patients-page.page';

describe('PatientsPagePage', () => {
  let component: PatientsPagePage;
  let fixture: ComponentFixture<PatientsPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
