/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Stack } from '../stack';
import { StackService } from '../stack.service';
import { BuildService } from '../build.service';

import { StackListComponent } from './stack-list.component';

describe('StackListComponent', () => {
  let component: StackListComponent;
  let fixture: ComponentFixture<StackListComponent>;
  let stackService: StackService;
  let buildService: BuildService;

  beforeEach(async(() => {
    stackService = <StackService>{
    };

    TestBed.configureTestingModule({
      declarations: [ StackListComponent ],
      providers: [ 
        {provide: StackService, useValue: stackService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when saving a stack', () => {
    it('should invoke update on the StackService', () => {
      const stack = new Stack();
      fixture.componentInstance.saveStack(stack);
      expect(stackService.update).toHaveBeenCalled();
    });
  });
});
