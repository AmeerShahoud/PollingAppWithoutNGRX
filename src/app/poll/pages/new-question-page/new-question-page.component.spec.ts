import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestionPageComponent } from './new-question-page.component';

describe('NewQuestionPageComponent', () => {
  let component: NewQuestionPageComponent;
  let fixture: ComponentFixture<NewQuestionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewQuestionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewQuestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
