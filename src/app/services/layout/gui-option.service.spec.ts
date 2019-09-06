import { TestBed } from '@angular/core/testing';

import { GuiOptionService } from './gui-option.service';

describe('GuiOptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuiOptionService = TestBed.get(GuiOptionService);
    expect(service).toBeTruthy();
  });
});
