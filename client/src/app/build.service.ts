import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Build } from './build';

/**
 * Represents the known set of build artifacts
 */
@Injectable()
export class BuildService {

  constructor() { }

  list(): Observable<Build[]> {
    return new Observable<Build[]>(observer => {
      const build = new Build();
      build.repository = 'ftr-api';
      build.branch = 'develop';
      build.key = 'ftr-api-0.0.1.zip';

      const builds = new Array<Build>();
      builds.push(build);
      builds.push(build);
      builds.push(build);
      builds.push(build);

      observer.next(builds);
    });
  }

}
