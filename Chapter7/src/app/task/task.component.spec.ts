import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { SubtaskComponent } from '../subtask/subtask.component'
import {TrelloService} from '../services/trello.service';

import {CustomSort} from '../shared/custom-sort.pipe';
import { Task } from '../model/task';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async(() => {
    const mockpipe = {};
    const mockTrelloService = {};
    TestBed.configureTestingModule({
      declarations: [ TaskComponent,
                      CustomSort,
                      SubtaskComponent ],
      imports: [
        FormsModule,
        RouterModule.forRoot([])],
        providers: [{provide: APP_BASE_HREF, useValue: '/'},
                    {provide: CustomSort, useValue: mockpipe},
                    {provide: TrelloService, useValue: mockTrelloService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = new Task();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
