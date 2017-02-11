import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { StackService } from '../stack.service';
import { BuildService } from '../build.service';
import { Build } from '../build';
import { Stack } from '../stack';

@Component({
  selector: 'asc-stack-list',
  templateUrl: './stack-list.component.html',
  styleUrls: ['./stack-list.component.css']
})
export class StackListComponent implements OnInit {

  stacks: Array<Stack>;
  builds: any;

  constructor(private stackService: StackService,
      private buildService: BuildService) { }

  ngOnInit() {
    this.stackService.list().subscribe((stacks) => this.stacks = stacks);
    this.loadBuilds();
  }

  /** 
   * transforms arrays of builds into a dictionary of:
   * { repository: { branch: [ build ]}}
   */
  private loadBuilds() {
    this.buildService.list().subscribe(builds => {
      this.builds = _.groupBy(builds, build => build.repository);

      for(let repository in this.builds) {
        const repoBuilds: Build[] = this.builds[repository];
        const branches = _.groupBy(repoBuilds, build => build.branch);
        this.builds[repository] = branches;
      }
    });
  }

}
