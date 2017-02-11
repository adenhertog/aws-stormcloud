import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { VersionSelectionComponent } from '../version-selection/version-selection.component';
import { DeleteStackComponent } from '../delete-stack/delete-stack.component';
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
  @Input() templates: any;

  @Output() deleteStack: EventEmitter<void>;
  @Output() saveStack: EventEmitter<void>;

  constructor(
    private dialog: MdDialog
  ) { 
    this.deleteStack = new EventEmitter<void>();
    this.saveStack = new EventEmitter<void>();
  }

  ngOnInit() {
  }

  save() {
    this.saveStack.emit();
  }

  delete() {
    const deleteDialog = this.dialog.open(DeleteStackComponent);
    deleteDialog.componentInstance.stack = this.stack;
    deleteDialog.afterClosed().subscribe(result => {
      if (result) {
        this.deleteStack.emit();
      }
    });
  }

  configureTemplate() {
    const versionDialog = this.dialog.open(VersionSelectionComponent);
    versionDialog.componentInstance.branches = this.templates;
    versionDialog.afterClosed().subscribe(result => {
      if (result) {
        const build = <Build>result;
        this.stack.template = build;
      }
    });
  }

  configureParameter(currentBuild: Build) {
    const versionDialog = this.dialog.open(VersionSelectionComponent);
    versionDialog.componentInstance.branches = this.builds[currentBuild.repository];
    versionDialog.afterClosed().subscribe(result => {
      if (result) {
        const build = <Build>result;
        const replaceTarget = this.stack.builds.find(b => b.repository === build.repository);
        const index = this.stack.builds.indexOf(replaceTarget);
        this.stack.builds[index] = build;
      }
    });
  }

}
