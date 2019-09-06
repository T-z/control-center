import { TestBed } from '@angular/core/testing';

import { NodeBackupService } from './node-backup.service';

describe('NodeBackupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NodeBackupService = TestBed.get(NodeBackupService);
    expect(service).toBeTruthy();
  });
});
