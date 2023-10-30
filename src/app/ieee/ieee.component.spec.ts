import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeeeComponent } from './ieee.component';

describe('IeeeComponent', () => {
  let component: IeeeComponent;
  let fixture: ComponentFixture<IeeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IeeeComponent]
    });
    fixture = TestBed.createComponent(IeeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
