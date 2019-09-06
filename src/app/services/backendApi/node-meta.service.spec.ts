import { TestBed } from '@angular/core/testing';

import { NodeMetaService } from './node-meta.service';

describe('NodeMetaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NodeMetaService = TestBed.get(NodeMetaService);
    expect(service).toBeTruthy();
  });
});
