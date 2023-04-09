import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionVoteComponent } from './question-vote.component';

describe('QuestionVoteComponent', () => {
  let component: QuestionVoteComponent;
  let fixture: ComponentFixture<QuestionVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionVoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
