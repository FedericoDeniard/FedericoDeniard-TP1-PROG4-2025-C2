import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreaterOrLower } from './greater-or-lower';

describe('GreaterOrLower', () => {
  let component: GreaterOrLower;
  let fixture: ComponentFixture<GreaterOrLower>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreaterOrLower]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreaterOrLower);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
