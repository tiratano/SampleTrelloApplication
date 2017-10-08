import {Component, Input, Output, OnInit, AfterViewInit, EventEmitter, ElementRef} from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import{TrelloService} from '../services/trello.service'
import {Task} from '../model/task'
import {SubTask} from '../model/subtask'
import {Board} from '../model/board'

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
  @Output() subTaskUpdate: EventEmitter<SubTask>;


 boards: Board[];
  board: Board = new Board;
  editingtask = false;
  addingsubTask = false;
  addsubTaskText: string;
  currentTitle: string;
  constructor(private el: ElementRef,private _route: ActivatedRoute,private _boardService:TrelloService) { 
     this.onAddsubTask = new EventEmitter();
    this.subTaskUpdate = new EventEmitter();
  }

  ngOnInit() {
    let boardId = this._route.snapshot.params['id'];
    console.log(boardId);
    this.boards = this._boardService.Boards;
    console.log(this.boards);
    for(let v of this.boards){
      if(v.id == boardId){
        this.board = v;
        break;
      }
    }
    
    this.subTasks =  this.task.subtask;
    
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
    let newsubTask = <SubTask>{
      title: this.addsubTaskText
     // order: (this.subTasks.length + 1) * 1000,
      //taskId: this.task._id,
     // boardId: this.task.boardId
    };
     let selectedtask: Task;
      for(let v of this.board.task){
      if(v.id == this.task.id){
        selectedtask = v;
        break;
      }
    }
    if(selectedtask.subtask == undefined){
      selectedtask.subtask = new Array();
    }
    selectedtask.subtask.push(newsubTask);
    this.subTasks = selectedtask.subtask;
    //this._ws.addsubTask("123",newsubTask);
 //   this._subTaskService.post(newsubTask)
   //   .subscribe(subTask => {
     //   this.onAddsubTask.emit(subTask);
      //  this._ws.addsubTask(subTask.boardId, subTask);
      //});
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
     // this._taskService.put(this.task).then(res => {
       // this._ws.updatetask(this.task.boardId, this.task);
      //});
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
    let input = this.el.nativeElement
      .getElementsByClassName('task-header')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function() { input.focus(); }, 0);
  }

  enableAddsubTask() {
    this.addingsubTask = true;
    let input = this.el.nativeElement
      .getElementsByClassName('add-subTask')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function() { input.focus(); }, 0);
  }


  updatetaskOnBlur() {
    if (this.editingtask) {
      this.updatetask();
      this.clearAddsubTask();
    }
  }


  addsubTaskOnBlur() {
    if (this.addingsubTask) {
      if (this.addsubTaskText && this.addsubTaskText.trim() !== '') {
        this.addsubTask();
      }
    }
    this.clearAddsubTask();
  }

  clearAddsubTask() {
    this.addingsubTask = false;
    this.addsubTaskText = '';
  }

  onsubTaskUpdate(subTask: SubTask){
    this.subTaskUpdate.emit(subTask);
  }

}
