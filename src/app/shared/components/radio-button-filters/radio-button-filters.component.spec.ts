import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonFiltersComponent } from './radio-button-filters.component';

describe('RadioButtonFiltersComponent', () => {
  let component: RadioButtonFiltersComponent;
  let fixture: ComponentFixture<RadioButtonFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadioButtonFiltersComponent]
    });
    fixture = TestBed.createComponent(RadioButtonFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
