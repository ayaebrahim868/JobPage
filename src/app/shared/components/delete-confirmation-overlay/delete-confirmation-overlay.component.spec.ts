import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationOverlayComponent } from './delete-confirmation-overlay.component';

describe('DeleteConfirmationOverlayComponent', () => {
  let component: DeleteConfirmationOverlayComponent;
  let fixture: ComponentFixture<DeleteConfirmationOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [DeleteConfirmationOverlayComponent]
});
    fixture = TestBed.createComponent(DeleteConfirmationOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
