import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GgSholarComponent } from './gg-sholar.component';

describe('GgSholarComponent', () => {
  let component: GgSholarComponent;
  let fixture: ComponentFixture<GgSholarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GgSholarComponent]
    });
    fixture = TestBed.createComponent(GgSholarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
