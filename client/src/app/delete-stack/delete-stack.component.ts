import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { StackComponent } from '../stack/stack.component';
import { Stack } from '../stack';

@Component({
  selector: 'asc-delete-stack',
  templateUrl: './delete-stack.component.html',
  styleUrls: ['./delete-stack.component.css']
})
export class DeleteStackComponent implements OnInit {

  stack: Stack;

  constructor(public dialogRef: MdDialogRef<StackComponent>) {}

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close();
  }

}
