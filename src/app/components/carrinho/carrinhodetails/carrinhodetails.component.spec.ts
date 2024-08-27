import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhodetailsComponent } from './carrinhodetails.component';

describe('CarrinhodetailsComponent', () => {
  let component: CarrinhodetailsComponent;
  let fixture: ComponentFixture<CarrinhodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrinhodetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrinhodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
