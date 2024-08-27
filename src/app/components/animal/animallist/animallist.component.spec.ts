import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimallistComponent } from './animallist.component';

describe('AnimallistComponent', () => {
  let component: AnimallistComponent;
  let fixture: ComponentFixture<AnimallistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimallistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
