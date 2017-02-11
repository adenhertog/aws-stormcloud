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
      const developBuild = new Build();
      developBuild.repository = 'ftr-api';
      developBuild.branch = 'develop';
      developBuild.key = 'ftr-api-0.0.1.zip';

      const masterBuild = new Build();
      masterBuild.repository = 'ftr-api';
      masterBuild.branch = 'master';
      masterBuild.key = 'ftr-api-0.0.2.zip';

      const builds = new Array<Build>();
      builds.push(developBuild);
      builds.push(developBuild);
      builds.push(developBuild);
      builds.push(masterBuild);
      builds.push(masterBuild);
      builds.push(masterBuild);

      observer.next(builds);
    });
  }

}
