import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TaskComponent } from './task/task.component';
import { BoardComponent } from './board/board.component';
import { TrelloService } from './services/trello.service';
import { SubtaskComponent } from './subtask/subtask.component'
import {CustomSort } from './shared/custom-sort.pipe'


const appRoutes: Routes = [
  { path: 'board/:id', component: BoardComponent, pathMatch: 'full' },

  { path: '', component: HomepageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    TaskComponent,
    BoardComponent,
    SubtaskComponent,
    CustomSort
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
     RouterModule.forRoot(appRoutes)
  ],
  providers: [TrelloService],
  bootstrap: [AppComponent]
})
export class AppModule { }
