import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialTextComponent } from './special-text.component';

describe('SpecialTextComponent', () => {
  let component: SpecialTextComponent;
  let fixture: ComponentFixture<SpecialTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
