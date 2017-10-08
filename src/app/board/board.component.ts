import { Component, OnInit, ElementRef } from '@angular/core';
import {  Params, ActivatedRoute } from '@angular/router';

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
  //boards: Board[];
  board: Board = new Board;
  errorMessage: string;
  addtaskText: string;
  addingtask = false;
  boardWidth: number;
  tasksAdded: number = 0;

  editingTilte = false;
  currentTitle: string;

  constructor(public el: ElementRef, private _route: ActivatedRoute, private _trelloService: TrelloService) { }

  ngOnInit() {
    let boardId = this._route.snapshot.params['id'];
    console.log(boardId);
    this.board = this._trelloService.Boards.find(x=> x.id == boardId);
  }

  editTitle() {
    this.currentTitle = this.board.title;
    this.editingTilte = true;

    let input = this.el.nativeElement
      .getElementsByClassName('board-title')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }

  enableAddtask() {
    this.addingtask = true;
    let input = this.el.nativeElement
      .getElementsByClassName('add-task')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);

  }
  updateBoard() {

    this.editingTilte = false;
    document.title = this.board.title + " | Generic Task Manager";
    this._trelloService.Boards.find(x=>x.id == this.board.id).title = this.board.title;
  }
  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }
  addtaskOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.addtaskText && this.addtaskText.trim() !== '') {
        this.addtask();
      } else {
        this.clearAddtask();
      }
    }
    else if (event.keyCode === 27) {
      this.clearAddtask();
    }
  }
  clearAddtask() {
    this.addingtask = false;
    this.addtaskText = '';
  }
  addtask() {
    let newID = this.board.task.length + 1;
    let newtask = <Task>{
      title: this.addtaskText,
      id: newID
      // order: (this.board.task.length + 1) * 1000,
      //boardId: this.board.id
    };
    this.board.task.push(newtask);
    this.updateBoardWidth();
    this.addtaskText = '';

  }
  updateBoardWidth() {
    // this.boardWidth = ((this.board.task.length + (this.tasksAdded > 0 ? 1 : 2)) * 280) + 10;
    this.boardWidth = ((this.board.task.length + 1) * 280) + 10;

    if (this.boardWidth > document.body.scrollWidth) {
      document.getElementById('main').style.width = this.boardWidth + 'px';
    } else {
      document.getElementById('main').style.width = '100%';
    }

    if (this.tasksAdded > 0) {
      let wrapper = document.getElementById('content-wrapper');
      wrapper.scrollLeft = wrapper.scrollWidth;
    }

    this.tasksAdded++;
  }
  addtaskOnBlur() {
    if (this.addtaskText && this.addtaskText.trim() !== '') {
      this.addtask();
    }
    this.clearAddtask();
  }

}
