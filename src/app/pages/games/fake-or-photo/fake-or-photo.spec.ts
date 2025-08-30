import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeOrPhoto } from './fake-or-photo';

describe('FakeOrPhoto', () => {
  let component: FakeOrPhoto;
  let fixture: ComponentFixture<FakeOrPhoto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakeOrPhoto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeOrPhoto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
