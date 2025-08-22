import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Colours } from './colours';

describe('Colours', () => {
  let component: Colours;
  let fixture: ComponentFixture<Colours>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Colours]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Colours);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
