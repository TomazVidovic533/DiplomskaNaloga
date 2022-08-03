import { TestBed } from '@angular/core/testing';

import { RoomsFilesService } from './rooms-files.service';

describe('RoomsFilesService', () => {
  let service: RoomsFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomsFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
