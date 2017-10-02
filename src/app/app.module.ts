import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TaskheaderComponent } from './taskheader/taskheader.component';
import { TaskComponent } from './task/task.component';
import { BoardComponent } from './board/board.component';
import { BoardService } from './services/trello.service'


const appRoutes: Routes = [
  { path: 'board/:id', component: BoardComponent },
  { path: '', component: HomepageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    TaskheaderComponent,
    TaskComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
     RouterModule.forRoot(appRoutes)
  ],
  providers: [BoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
