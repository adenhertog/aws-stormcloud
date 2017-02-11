import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { VersionSelectionComponent } from '../version-selection/version-selection.component';
import { Build } from '../build';
import { Stack } from '../stack';

@Component({
  selector: '[asc-stack]',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {

  @Input() stack: Stack;
  @Input() builds: any;

  constructor(
    private dialog: MdDialog
  ) { }

  ngOnInit() {
  }

  configureParameter(currentBuild: Build) {
    const dialogRef = this.dialog.open(VersionSelectionComponent);
    dialogRef.componentInstance.branches = this.builds[currentBuild.repository];
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const build = <Build>result;
      }
    });
  }

}
