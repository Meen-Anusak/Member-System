import { TestBed } from '@angular/core/testing';

import { UnauthenGuard } from './unauthen.guard';

describe('UnauthenGuard', () => {
  let guard: UnauthenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnauthenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
