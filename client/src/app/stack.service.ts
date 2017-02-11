import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Build } from './build';
import { Stack } from './stack';

/**
 * Manages the creation and modifications to AWS CFN Stack definitions
 */
@Injectable()
export class StackService {

  constructor() { }

  /**
   * Returns a list of all tracked stacks
   */
  list(): Observable<Array<Stack>> {
    return new Observable<Array<Stack>>(observer => {
      let stacks = new Array<Stack>();
      let stack1 = new Stack();
      stack1.name = 'ftrx-andrew';
      stack1.template = new Build();
      stack1.template.branch = 'develop';
      stack1.template.repository = 'ftr-cloudformation';
      stack1.template.key = '0.0.1/main.template';

      stack1.builds = new Array<Build>();

      const ftrApi = new Build();
      ftrApi.repository = 'ftr-api';
      ftrApi.branch = 'develop';
      ftrApi.key = 'ftr-api-0.0.0.zip';
      stack1.builds.push(ftrApi);

      stacks.push(stack1);
      stacks.push(stack1);
      stacks.push(stack1);

      observer.next(stacks);
    });
  }

  delete(stack: Stack): Observable<void> {
    return new Observable<void>(observer => observer.next());
  }

  /** 
   * Creates a new stack
   */
  create(stack: Stack) {

  }

  /**
   * Sends local stack changes back to the server
   */
  update(stack: Stack) {

  }
}
