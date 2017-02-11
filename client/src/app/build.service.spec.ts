/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BuildService } from './build.service';

describe('BuildService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildService]
    });
  });

  it('should ...', inject([BuildService], (service: BuildService) => {
    expect(service).toBeTruthy();
  }));
});
