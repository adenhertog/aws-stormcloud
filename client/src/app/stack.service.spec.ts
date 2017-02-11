/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StackService } from './stack.service';

describe('StackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StackService]
    });
  });

  it('should ...', inject([StackService], (service: StackService) => {
    expect(service).toBeTruthy();
  }));
});
