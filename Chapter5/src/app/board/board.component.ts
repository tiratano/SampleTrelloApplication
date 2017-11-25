import { Component, OnInit, ElementRef } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

import { TrelloService } from '../services/trello.service'
import { Task } from '../model/task'
import { Board } from '../model/board'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  task: Task;
  board: Board = new Board;
  errorMessage: string;
  addtaskText: string;
  boardWidth: number;
  tasksAdded = 0;

  editingTitle = false;
  currentTitle: string;

  constructor(public el: ElementRef, private _route: ActivatedRoute, private _trelloService: TrelloService) { }

  ngOnInit() {
    const boardId = this._route.snapshot.params['id'];
    console.log(boardId);
    this.board = this._trelloService.Boards.find(x => x.id == boardId);
  }

  addsubTask(event) {
    console.log('Event Fired');
    console.log(event);
  }
  editTitle() {
    this.currentTitle = this.board.title;
    this.editingTitle = true;

    const input = this.el.nativeElement
      .getElementsByClassName('board-title')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }

  enableAddtask() {
    const input = this.el.nativeElement
      .getElementsByClassName('add-task')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);

  }
  updateBoard() {

    this.editingTitle = false;
    document.title = this.board.title + ' | Generic Task Manager';
    this._trelloService.Boards.find(x => x.id == this.board.id).title = this.board.title;
  }
  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
    else if (event.keyCode === 27) {
      this.board.title = this.currentTitle;
      this.editingTitle = false;
    }
  }
  addtaskOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.addtaskText && this.addtaskText.trim() !== '') {
        this.addtask();
        this.updateBoardWidth();
      } else {
        this.clearAddtask();
      }
    }
    else if (event.keyCode === 27) {
      this.clearAddtask();
    }
  }
  clearAddtask() {
    this.addtaskText = '';
  }
  addtask() {
    const newID = this.board.task.length + 1;
    const newtask = <Task>{
      title: this.addtaskText,
      id: newID
     };
    this.board.task.push(newtask);
    this.addtaskText = '';

  }
  updateBoardWidth() {
    this.boardWidth = ((this.board.task.length + 1) * 280) + 10;

    if (this.boardWidth > document.body.scrollWidth) {
      document.getElementById('main').style.width = this.boardWidth + 'px';
    } else {
      document.getElementById('main').style.width = '100%';
    }

    if (this.tasksAdded > 0) {
      const wrapper = document.getElementById('content-wrapper');
      wrapper.scrollLeft = wrapper.scrollWidth;
    }

    this.tasksAdded++;
  }
  addtaskOnBlur() {
    if (this.addtaskText && this.addtaskText.trim() !== '') {
      this.addtask();
      this.updateBoardWidth();
    }
    this.clearAddtask();
  }

}
