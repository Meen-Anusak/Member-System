import { TestBed } from '@angular/core/testing';

import { NotifyAlertService } from './notify-alert.service';

describe('NotifyAlertService', () => {
  let service: NotifyAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifyAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
