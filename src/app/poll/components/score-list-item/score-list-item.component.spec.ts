import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreListItemComponent } from './score-list-item.component';

describe('ScoreListItemComponent', () => {
  let component: ScoreListItemComponent;
  let fixture: ComponentFixture<ScoreListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
