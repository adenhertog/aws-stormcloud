import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Build } from '../build';
import { StackComponent } from '../stack/stack.component';

@Component({
  selector: 'asc-version-selection',
  templateUrl: './version-selection.component.html',
  styleUrls: ['./version-selection.component.css']
})
export class VersionSelectionComponent implements OnInit {
  branches: any;
  constructor(public dialogRef: MdDialogRef<StackComponent>) {
    this.branches = {};
  }

  ngOnInit() {
  }

  select(build: Build) {
    this.dialogRef.close(build);
  }

}
