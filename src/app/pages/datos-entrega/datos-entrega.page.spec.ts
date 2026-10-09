import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosEntregaPage } from './datos-entrega.page';

describe('DatosEntregaPage', () => {
  let component: DatosEntregaPage;
  let fixture: ComponentFixture<DatosEntregaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEntregaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
