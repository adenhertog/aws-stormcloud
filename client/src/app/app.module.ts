import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { StackService } from './stack.service';
import { BuildService } from './build.service'

import { AppComponent } from './app.component';
import { StackComponent } from './stack/stack.component';
import { StackListComponent } from './stack-list/stack-list.component';
import { VersionSelectionComponent } from './version-selection/version-selection.component';
import { KeyPipe } from './key.pipe';

@NgModule({
  entryComponents: [
    VersionSelectionComponent
  ],
  declarations: [
    AppComponent,
    StackComponent,
    StackListComponent,
    VersionSelectionComponent,
    KeyPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [ 
    StackService,
    BuildService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
