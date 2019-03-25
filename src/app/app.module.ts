import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HomeComponent,
  DiagramComponent,
  DashboardComponent,
  CodeEditorComponent,
  PlateComponent
} from './components';
import { MatModule } from './shared/mat.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DiagramComponent,
    DashboardComponent,
    CodeEditorComponent,
    PlateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
