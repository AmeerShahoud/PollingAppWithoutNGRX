import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PollEffects } from './poll.effects';

describe('PollEffects', () => {
  let actions$: Observable<any>;
  let effects: PollEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PollEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PollEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
