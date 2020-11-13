import { TestBed } from '@angular/core/testing';

import { FsGuardGuard } from './fs-guard.guard';

describe('FsGuardGuard', () => {
  let guard: FsGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FsGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
