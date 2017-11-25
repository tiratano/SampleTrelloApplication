import { Component, Input, Output, OnInit, AfterViewInit, EventEmitter, ElementRef } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { TrelloService } from '../services/trello.service'
import { Task } from '../model/task'
import { SubTask } from '../model/subtask'
import { Board } from '../model/board'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input()
  task: Task;
  @Input()
  subTasks: SubTask[];
  @Output()
  public onAddsubTask: EventEmitter<SubTask>;

  boards: Board[];
  board: Board = new Board;
  editingtask = false;
  addsubTaskText: string;
  currentTitle: string;
  constructor(private el: ElementRef, private _route: ActivatedRoute, private _boardService: TrelloService) {
    this.onAddsubTask = new EventEmitter();
  }

  ngOnInit() {
    const boardId = this._route.snapshot.params['id'];
    if (boardId != undefined) {
      this.boards = this._boardService.Boards;
      console.log(this.boards);
      for (const v of this.boards) {
        if (v.id == boardId) {
          this.board = v;
          break;
        }
      }
    };
  }

  addtaskOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.updatetask();
    } else if (event.keyCode === 27) {
      this.cleadAddtask();
    }
  }

  addsubTask() {
    this.subTasks = this.subTasks || [];
    const newsubTask = <SubTask>{
      title: this.addsubTaskText
    };
    let selectedtask: Task;
    for (const v of this.board.task) {
      if (v.id == this.task.id) {
        selectedtask = v;
        break;
      }
    }

    if (selectedtask.subtask == undefined) {
      selectedtask.subtask = new Array();
    }
    selectedtask.subtask.push(newsubTask);
    this.subTasks = selectedtask.subtask;
    this.onAddsubTask.emit(newsubTask);
  }

  addsubTaskOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.addsubTaskText && this.addsubTaskText.trim() !== '') {
        this.addsubTask();
        this.addsubTaskText = '';
      } else {
        this.clearAddsubTask();
      }
    } else if (event.keyCode === 27) {
      this.clearAddsubTask();
    }
  }
  updatetask() {
    if (this.task.title && this.task.title.trim() !== '') {
      this.editingtask = false;
    } else {
      this.cleadAddtask();
    }
  }

  cleadAddtask() {
    this.task.title = this.currentTitle;
    this.editingtask = false;
  }

  edittask() {
    this.currentTitle = this.task.title;
    this.editingtask = true;
    const input = this.el.nativeElement
      .getElementsByClassName('task-header')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }

  enableAddsubTask() {
    const input = this.el.nativeElement
      .getElementsByClassName('add-subTask')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }


  updatetaskOnBlur() {
    if (this.editingtask) {
      this.updatetask();
      this.clearAddsubTask();
    }
  }


  addsubTaskOnBlur() {
    if (this.addsubTaskText && this.addsubTaskText.trim() !== '') {
      this.addsubTask();
    }
    this.clearAddsubTask();
  }

  clearAddsubTask() {
    this.addsubTaskText = '';
  }
}
