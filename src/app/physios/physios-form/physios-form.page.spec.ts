import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhysiosFormPage } from './physios-form.page';

describe('PhysiosFormPage', () => {
  let component: PhysiosFormPage;
  let fixture: ComponentFixture<PhysiosFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiosFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
