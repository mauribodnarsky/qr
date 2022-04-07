import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarScannerComponent } from './quar-scanner.component';

describe('QuarScannerComponent', () => {
  let component: QuarScannerComponent;
  let fixture: ComponentFixture<QuarScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuarScannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
