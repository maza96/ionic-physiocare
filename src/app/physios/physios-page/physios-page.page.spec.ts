import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhysiosPagePage } from './physios-page.page';

describe('PhysiosPagePage', () => {
  let component: PhysiosPagePage;
  let fixture: ComponentFixture<PhysiosPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiosPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
